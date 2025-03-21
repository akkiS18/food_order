const { Markup } = require("telegraf");
const { getUsers, addUser } = require("../database/user");
const { getCategoryKeyboard, getMainKeyboard } = require("./keyboard");

const handleStart = async (ctx) => {
	try {
		const users = await getUsers();
		const exist = users.find((user) => user.id == ctx.from.id);

		if (exist !== undefined) {
			ctx.session = {};

			ctx.reply("Bosh menyu", getMainKeyboard());
		} else {
			ctx.reply(
				"Salom. Avval botdan ro'yxatdan o'ting",
				Markup.keyboard([["Ro'yxatdan o'tish 📋"]])
					.resize()
					.oneTime()
			);
		}
	} catch (error) {
		console.error("Foydalanuvchilarni olishda xatolik:", error);
	}
};

const handleMessages = async (ctx) => {
	try {
		const users = await getUsers();
		const exist = users.find((user) => user.id == ctx.from.id);

		if (exist !== undefined) {
			if (ctx.message.text === "🍽 Buyurtma berishni boshlash") {
				ctx.reply("Kategoriyani tanlang", getCategoryKeyboard());
			} else if (ctx.message.text === "🌯 Lavash") {
				ctx.scene.enter("lavashScene");
			} else if (ctx.message.text === "🍕 Pitsa") {
				ctx.scene.enter("pizzaScene");
			} else if (ctx.message.text === "🥫 Sous") {
				ctx.scene.enter("sousScene");
			} else if (ctx.message.text === "🥤 Ichimliklar") {
				ctx.scene.enter("drinkScene");
			} else if (ctx.message.text === "✅ Buyurtmani rasmiylashtirish") {
				ctx.scene.enter("orderScene");
			} else if (ctx.message.text === "🔙 Ortga qaytish") {
				ctx.reply("Bosh menyu", getMainKeyboard());
			} else if (ctx.message.text === "📜 Buyurtmalarim tarixi") {
				ctx.scene.enter("getOrderScene");
			} else if (ctx.message.text === "⚡️ ADMIN PANEL") {
				if (ctx.from.id == 311574536) {
					ctx.scene.enter("adminScene");
				} else {
					ctx.reply("Sizda kirish huquqi yo'q", getMainKeyboard());
				}
			}
		} else {
			if (ctx.message.text === "Ro'yxatdan o'tish 📋") {
				ctx.reply(
					"Telefon raqamingizni yuboring",
					Markup.keyboard([
						Markup.button.contactRequest("Telefon raqamni yuborish 📲"),
					])
						.resize()
						.oneTime()
				);
			} else if (ctx.message.contact) {
				const phone = ctx.message.contact.phone_number;
				await addUser({
					id: ctx.from.id,
					username: ctx.from.first_name,
					phone: phone,
				});

				ctx.reply("Muvaffaqiyatli ro'yxatdan o'tdingiz", getMainKeyboard());
			}
		}
	} catch (error) {
		console.error("Foydalanuvchilarni olishda xatolik:", error);
	}
};

module.exports = { handleStart, handleMessages };
