const { Markup, Scenes } = require("telegraf");
const { getAllOrders, getOrder } = require("../database/order");
const {
	getAdminKeyboard,
	getMainKeyboard,
	priceProducts,
} = require("./keyboard");

const adminScene = new Scenes.WizardScene(
	"adminScene",
	async (ctx) => {
		ctx.reply("Admin panel:", getAdminKeyboard());

		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message.text === "📦📜 Barcha buyurtmalarni ko'rish") {
			const allOrders = await getAllOrders();
			let message = "📦 *Umumiy buyurtmalar:*\n\n";

			if (allOrders.length === 0) {
				message += "🚫 Sizda hali buyurtmalar yo‘q.";
			} else {
				allOrders.forEach((order, index) => {
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

			ctx.reply(message, getAdminKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		} else if (ctx.message.text === "🆔🔍 ID orqali buyurtmani qidirish") {
			ctx.reply(
				"Buyurtma ID sini yuboring",
				Markup.keyboard(["🔙 Ortga"]).resize().oneTime()
			);

			return ctx.wizard.next();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Bosh menyu", getMainKeyboard());

			return ctx.scene.leave();
		}
	},
	async (ctx) => {
		if (!isNaN(+ctx.message.text)) {
			const order = await getOrder(+ctx.message.text);
			if (order) {
				let message = "";
				totalPrice = 0;

				const parsedItems = JSON.parse(order.order_items[0]); // JSON stringni obyektga o‘girish

				message += `🆔 Buyurtma ID: *${order.order_id}*\n\n`;
				message += `🛒 *Mahsulotlar:* \n`;

				Object.keys(parsedItems).forEach((category) => {
					if (parsedItems[category].length > 0) {
						parsedItems[category].forEach((product) => {
							const productInfo = priceProducts.find(
								(p) => p.name == product.product
							);

							if (productInfo) {
								const itemTotal = productInfo.price * product.quantity;
								totalPrice += itemTotal;
								message += `   ➖ ${product.product} - *${product.quantity} ta*\n`;
							}
						});
					}
				});

				message += `\n\nNarxi: ${totalPrice} so'm`;

				ctx.reply(message, getAdminKeyboard());
			} else {
				ctx.reply(
					`⚠️ ID: ${ctx.message.text} buyurtma topilmadi!`,
					getAdminKeyboard()
				);
			}

			return ctx.wizard.back();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Admin panel:", getAdminKeyboard());

			return ctx.wizard.back();
		} else {
			ctx.reply(
				"⚠️ Noto‘g‘ri ma'lumot kiritdingiz! Faqat raqam kiritishingiz shart. Buyurtma ID sini qayta yuboring",
				Markup.keyboard(["🔙 Ortga"]).resize().oneTime()
			);

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	}
);

module.exports = {
	adminScene,
};
