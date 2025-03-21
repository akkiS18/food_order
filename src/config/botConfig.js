require("dotenv").config();
const { Telegraf, Scenes } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const {
	lavashScene,
	pizzaScene,
	sousScene,
	drinkScene,
} = require("../bot/productsHandlers");
const { adminScene } = require("../bot/adminHandlers");
const { orderScene, getOrderScene } = require("../bot/orderHandlers");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(new LocalSession({ database: "session.json" }).middleware());
const stage = new Scenes.Stage([
	lavashScene,
	pizzaScene,
	sousScene,
	drinkScene,
	orderScene,
	getOrderScene,
	adminScene,
]);
bot.use(stage.middleware());

bot.telegram.setMyCommands([
	{ command: "start", description: "Foydalanishni boshlash" },
]);

module.exports = bot;
