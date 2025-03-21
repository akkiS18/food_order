const { Markup, Scenes } = require("telegraf");
const {
	getCategoryKeyboard,
	priceProducts,
	getMainKeyboard,
} = require("./keyboard");
const { addOrder, getUserOrders } = require("../database/order");

const orderScene = new Scenes.WizardScene(
	"orderScene",
	async (ctx) => {
		let message = "";
		let totalPrice = 0;

		Object.keys(ctx.session.products).forEach((category) => {
			if (ctx.session.products[category].length > 0) {
				message += `🍽 *${category.toUpperCase()}*:\n`;
				ctx.session.products[category].forEach((item, index) => {
					const productInfo = priceProducts.find(
						(p) => p.name === item.product
					);
					if (productInfo) {
						const itemTotal = productInfo.price * item.quantity;
						totalPrice += itemTotal;
						message += `   ➖ ${index + 1}. ${item.product} - *${
							item.quantity
						} ta*`;
					}
				});
				message += "\n";
			}
		});

		if (ctx.session.products) {
			ctx.reply(
				`Buyurtma:\n\n${message}\n\nNarxi: ${totalPrice} so'm`,
				Markup.keyboard([["Davom etish", "🔙 Ortga"]])
					.resize()
					.oneTime()
			);
			return ctx.wizard.next();
		} else {
			ctx.reply(
				"⚠️ Buyurtma berish uchun mahsulotlar tanlanmadi!",
				getCategoryKeyboard()
			);

			return ctx.scene.leave();
		}
	},
	async (ctx) => {
		if (ctx.message.text === "Davom etish") {
			const paymentUrl = `https://my.click.uz/pay?service_id=12345&merchant_trans_id=${ctx.from.id}&amount=10000&transaction_param=${ctx.from.id}&return_url=https://t.me/ziadin_food_order_bot`;

			const add = await addOrder(ctx.from.id, ctx.session.products);
			if (add) {
				ctx.reply("Buyurtma rasmiylashtirildi!", getCategoryKeyboard());
				ctx.session = {};
			}

			ctx.reply(
				"To‘lov qilish uchun quyidagi tugmani bosing:",
				Markup.inlineKeyboard([
					Markup.button.url("💳 To‘lov qilish", paymentUrl),
				])
			);

			return ctx.scene.leave();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Yana mahsulot tanlaysizmi?", getCategoryKeyboard());

			return ctx.scene.leave();
		}
	}
);

const getOrderScene = new Scenes.WizardScene("getOrderScene", async (ctx) => {
	const orders = await getUserOrders(ctx.from.id);
	let message = "📦 *Sizning buyurtmalaringiz:*\n\n";

	if (orders.length === 0) {
		message += "🚫 Sizda hali buyurtmalar yo‘q.";
	} else {
		orders.forEach((order, index) => {
			let totalPrice = 0;
			const parsedItems = JSON.parse(order.order_items[0]); // JSON stringni obyektga o‘girish

			message += `🆔 Buyurtma ID: *${order.order_id}*\n`;
			message += `🛒 *Mahsulotlar:* \n`;

			Object.keys(parsedItems).forEach((category) => {
				if (parsedItems[category].length > 0) {
					parsedItems[category].forEach((product) => {
						const productInfo = priceProducts.find(
							(p) => p.name === product.product
						);

						if (productInfo) {
							const itemTotal = productInfo.price * product.quantity;
							totalPrice += itemTotal;

							message += `   ➖ ${product.product} - *${product.quantity} ta*\n`;
						}
					});
				}
			});
			message += `\nNarxi: ${totalPrice} so'm\n`;

			message += "\n────────────────────\n\n";
		});
	}

	ctx.reply(message, getMainKeyboard());

	return ctx.scene.leave();
});

module.exports = {
	orderScene,
	getOrderScene,
};
