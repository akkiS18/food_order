const bot = require("../config/botConfig");
const { handleStart, handleMessages } = require("./handlers");

bot.command("start", handleStart);
bot.on("message", handleMessages);

module.exports = bot;
