const { Scenes } = require("telegraf");
const {
	getCategoryKeyboard,
	products,
	getLavashKeyboard,
	getNumberKeyboard,
	getPizzaKeyboard,
	getSousKeyboard,
	getDrinkKeyboard,
	priceProducts,
} = require("./keyboard");

const lavashScene = new Scenes.WizardScene(
	"lavashScene",
	async (ctx) => {
		//Lavashga kirdik andi Lavash tanlash
		ctx.reply("Lavashlardan birini tanlang:", getLavashKeyboard());

		return ctx.wizard.next();
	},
	async (ctx) => {
		// Lavash tanlandi endi Raqam tanlash
		const buttonsName = products.Lavash.map((product) => product.name);

		if (buttonsName.includes(ctx.message.text)) {
			ctx.session.products = ctx.session.products
				? ctx.session.products
				: { lavash: [], sous: [], pizza: [], drink: [] };

			ctx.session.products.lavash.push({
				product: ctx.message.text,
				quantity: 0,
			});
			ctx.reply(`"${ctx.message.text}"dan nechta?`, getNumberKeyboard());

			return ctx.wizard.next();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Kategoriyani tanlang:", getCategoryKeyboard());

			return ctx.scene.leave();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri mahsulot tanlandi!", getLavashKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	},
	async (ctx) => {
		// Raqam tanlandi endi saqlash

		if (["1", "2", "3", "4", "5"].includes(ctx.message.text)) {
			const quantity = +ctx.message.text;
			const currentProduct =
				ctx.session.products.lavash[ctx.session.products.lavash.length - 1]
					.product;
			let message = "";
			let totalPrice = 0;

			ctx.session.products.lavash[
				ctx.session.products.lavash.length - 1
			].quantity = quantity;

			Object.keys(ctx.session.products).forEach((category) => {
				if (ctx.session.products[category].length > 0) {
					message += `🍽 *${category.toUpperCase()}*:\n`;
					ctx.session.products[category].forEach((item, index) => {
						const productInfo = priceProducts.find(
							(p) => p.name === item.product
						);

						if (productInfo) {
							totalPrice += productInfo.price * item.quantity;

							message += `   ➖ ${index + 1}. ${item.product} - *${
								item.quantity
							} ta*\n`;
						}
					});

					message += "\n";
				}
			});
			message += `\nNarxi: ${totalPrice} so'm\n`;

			ctx.reply(
				`✅ ${currentProduct} - ${quantity} dona saqlandi!\n\n📝 Jami:\n\n${message}`,
				getCategoryKeyboard()
			);

			return ctx.scene.leave();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Lavashlardan birini tanlang:", getLavashKeyboard());

			return ctx.wizard.back();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri raqam tanlandi!", getNumberKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	}
);

const pizzaScene = new Scenes.WizardScene(
	"pizzaScene",
	async (ctx) => {
		//Pizzaga kirdik andi Pizza tanlash

		ctx.reply("Pitsalardan birini tanlang:", getPizzaKeyboard());
		return ctx.wizard.next();
	},
	async (ctx) => {
		// Pizza tanlandi endi Raqam tanlash
		const buttonsName = products.Pizza.map((product) => product.name);

		if (buttonsName.includes(ctx.message.text)) {
			ctx.session.products = ctx.session.products
				? ctx.session.products
				: { lavash: [], sous: [], pizza: [], drink: [] };

			ctx.session.products.pizza.push({
				product: ctx.message.text,
				quantity: 0,
			});
			ctx.reply(`"${ctx.message.text}"dan nechta?`, getNumberKeyboard());

			return ctx.wizard.next();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Kategoriyani tanlang:", getCategoryKeyboard());

			return ctx.scene.leave();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri mahsulot tanlandi!", getPizzaKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	},
	async (ctx) => {
		// Raqam tanlandi endi saqlash

		if (["1", "2", "3", "4", "5"].includes(ctx.message.text)) {
			const quantity = +ctx.message.text;
			const currentProduct =
				ctx.session.products.pizza[ctx.session.products.pizza.length - 1]
					.product;
			let message = "";
			let totalPrice = 0;

			ctx.session.products.pizza[
				ctx.session.products.pizza.length - 1
			].quantity = quantity;

			Object.keys(ctx.session.products).forEach((category) => {
				if (ctx.session.products[category].length > 0) {
					message += `🍽 *${category.toUpperCase()}*:\n`;
					ctx.session.products[category].forEach((item, index) => {
						const productInfo = priceProducts.find(
							(p) => p.name === item.product
						);

						if (productInfo) {
							totalPrice += productInfo.price * item.quantity;

							message += `   ➖ ${index + 1}. ${item.product} - *${
								item.quantity
							} ta*\n`;
						}
					});

					message += "\n";
				}
			});
			message += `\nNarxi: ${totalPrice} so'm\n`;

			ctx.reply(
				`✅ ${currentProduct} - ${quantity} dona saqlandi!\n\n📝 Jami:\n\n${message}`,
				getCategoryKeyboard()
			);

			return ctx.scene.leave();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Pitsalardan birini tanlang:", getPizzaKeyboard());

			return ctx.wizard.back();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri raqam tanlandi!", getNumberKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	}
);

const sousScene = new Scenes.WizardScene(
	"sousScene",
	async (ctx) => {
		//Sousga kirdik andi Sous tanlash

		ctx.reply("Souslardan birini tanlang:", getSousKeyboard());
		return ctx.wizard.next();
	},
	async (ctx) => {
		// Sous tanlandi endi Raqam tanlash
		const buttonsName = products.Sous.map((product) => product.name);

		if (buttonsName.includes(ctx.message.text)) {
			ctx.session.products = ctx.session.products
				? ctx.session.products
				: { lavash: [], sous: [], pizza: [], drink: [] };

			ctx.session.products.sous.push({
				product: ctx.message.text,
				quantity: 0,
			});
			ctx.reply(`"${ctx.message.text}"dan nechta?`, getNumberKeyboard());

			return ctx.wizard.next();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Kategoriyani tanlang:", getCategoryKeyboard());

			return ctx.scene.leave();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri mahsulot tanlandi!", getSousKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	},
	async (ctx) => {
		// Raqam tanlandi endi saqlash

		if (["1", "2", "3", "4", "5"].includes(ctx.message.text)) {
			const quantity = +ctx.message.text;
			const currentProduct =
				ctx.session.products.sous[ctx.session.products.sous.length - 1].product;
			let message = "";
			let totalPrice = 0;

			ctx.session.products.sous[ctx.session.products.sous.length - 1].quantity =
				quantity;

			Object.keys(ctx.session.products).forEach((category) => {
				if (ctx.session.products[category].length > 0) {
					message += `🍽 *${category.toUpperCase()}*:\n`;
					ctx.session.products[category].forEach((item, index) => {
						const productInfo = priceProducts.find(
							(p) => p.name === item.product
						);

						if (productInfo) {
							totalPrice += productInfo.price * item.quantity;

							message += `   ➖ ${index + 1}. ${item.product} - *${
								item.quantity
							} ta*\n`;
						}
					});

					message += "\n";
				}
			});
			message += `\nNarxi: ${totalPrice} so'm\n`;

			ctx.reply(
				`✅ ${currentProduct} - ${quantity} dona saqlandi!\n\n📝 Jami:\n\n${message}`,
				getCategoryKeyboard()
			);

			return ctx.scene.leave();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Souslardan birini tanlang:", getSousKeyboard());

			return ctx.wizard.back();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri raqam tanlandi!", getNumberKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	}
);

const drinkScene = new Scenes.WizardScene(
	"drinkScene",
	async (ctx) => {
		//Drinkga kirdik andi Drink tanlash

		ctx.reply("Ichimliklardan birini tanlang:", getDrinkKeyboard());
		return ctx.wizard.next();
	},
	async (ctx) => {
		// Drink tanlandi endi Raqam tanlash
		const buttonsName = products.Ichimliklar.map((product) => product.name);

		if (buttonsName.includes(ctx.message.text)) {
			ctx.session.products = ctx.session.products
				? ctx.session.products
				: { lavash: [], sous: [], pizza: [], drink: [] };

			ctx.session.products.drink.push({
				product: ctx.message.text,
				quantity: 0,
			});
			ctx.reply(`"${ctx.message.text}"dan nechta?`, getNumberKeyboard());

			return ctx.wizard.next();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Kategoriyani tanlang:", getCategoryKeyboard());

			return ctx.scene.leave();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri mahsulot tanlandi!", getDrinkKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	},
	async (ctx) => {
		// Raqam tanlandi endi saqlash

		if (["1", "2", "3", "4", "5"].includes(ctx.message.text)) {
			const quantity = +ctx.message.text;
			const currentProduct =
				ctx.session.products.drink[ctx.session.products.drink.length - 1]
					.product;
			let message = "";
			let totalPrice = 0;

			ctx.session.products.drink[
				ctx.session.products.drink.length - 1
			].quantity = quantity;

			Object.keys(ctx.session.products).forEach((category) => {
				if (ctx.session.products[category].length > 0) {
					message += `🍽 *${category.toUpperCase()}*:\n`;
					ctx.session.products[category].forEach((item, index) => {
						const productInfo = priceProducts.find(
							(p) => p.name === item.product
						);

						if (productInfo) {
							totalPrice += productInfo.price * item.quantity;

							message += `   ➖ ${index + 1}. ${item.product} - *${
								item.quantity
							} ta*\n`;
						}
					});

					message += "\n";
				}
			});
			message += `\nNarxi: ${totalPrice} so'm\n`;

			ctx.reply(
				`✅ ${currentProduct} - ${quantity} dona saqlandi!\n\n📝 Jami:\n\n${message}`,
				getCategoryKeyboard()
			);

			return ctx.scene.leave();
		} else if (ctx.message.text === "🔙 Ortga") {
			ctx.reply("Ichimliklardan birini tanlang:", getDrinkKeyboard());

			return ctx.wizard.back();
		} else {
			ctx.reply("⚠️ Noto‘g‘ri raqam tanlandi!", getNumberKeyboard());

			return ctx.wizard.selectStep(ctx.wizard.cursor);
		}
	}
);

module.exports = {
	lavashScene,
	pizzaScene,
	sousScene,
	drinkScene,
};
