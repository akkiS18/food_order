const { Markup } = require("telegraf");

const products = {
	Lavash: [
		{ name: "🌯 Lavash Klassik", id: 1 },
		{ name: "🌯 Lavash Tovuqli", id: 2 },
		{ name: "🌯 Lavash Pishloqli", id: 3 },
	],
	Pizza: [
		{ name: "🍕 Margarita", id: 4 },
		{ name: "🍕 Pepperoni", id: 5 },
	],
	Sous: [
		{ name: "🥫 Ketchup", id: 6 },
		{ name: "🥫 Mayonez", id: 7 },
		{ name: "🥫 Pishloq", id: 8 },
		{ name: "🥫 Sarimsoq", id: 9 },
	],
	Ichimliklar: [
		{ name: "Coca Cola 0.5", id: 10 },
		{ name: "Pepsi 0.5", id: 11 },
		{ name: "Coca Cola 1", id: 12 },
		{ name: "Pepsi 1", id: 13 },
		{ name: "Coca Cola 1.5", id: 14 },
		{ name: "Pepsi 1.5", id: 15 },
	],
};

const priceProducts = [
	{ name: "🌯 Lavash Klassik", id: 1, price: 28000 },
	{ name: "🌯 Lavash Tovuqli", id: 2, price: 26000 },
	{ name: "🌯 Lavash Pishloqli", id: 3, price: 30000 },
	{ name: "🍕 Margarita", id: 4, price: 60000 },
	{ name: "🍕 Pepperoni", id: 5, price: 70000 },
	{ name: "🥫 Ketchup", id: 6, price: 3000 },
	{ name: "🥫 Mayonez", id: 7, price: 3000 },
	{ name: "🥫 Pishloq", id: 8, price: 3000 },
	{ name: "🥫 Sarimsoq", id: 9, price: 3000 },
	{ name: "Coca Cola 0.5", id: 10, price: 7000 },
	{ name: "Pepsi 0.5", id: 11, price: 7000 },
	{ name: "Coca Cola 1", id: 12, price: 13000 },
	{ name: "Pepsi 1", id: 13, price: 13000 },
	{ name: "Coca Cola 1.5", id: 14, price: 18000 },
	{ name: "Pepsi 1.5", id: 15, price: 18000 },
];

const getLavashKeyboard = () => {
	return Markup.keyboard([
		["🌯 Lavash Klassik"],
		["🌯 Lavash Tovuqli"],
		["🌯 Lavash Pishloqli"],
		["🔙 Ortga"],
	])
		.resize()
		.oneTime();
};

const getPizzaKeyboard = () => {
	return Markup.keyboard([["🍕 Margarita"], ["🍕 Pepperoni"], ["🔙 Ortga"]])
		.resize()
		.oneTime();
};

const getSousKeyboard = () => {
	return Markup.keyboard([
		["🥫 Ketchup", "🥫 Mayonez"],
		["🥫 Pishloq", "🥫 Sarimsoq"],
		["🔙 Ortga"],
	])
		.resize()
		.oneTime();
};

const getDrinkKeyboard = () => {
	return Markup.keyboard([
		["Coca Cola 0.5", "Pepsi 0.5"],
		["Coca Cola 1", "Pepsi 1"],
		["Coca Cola 1.5", "Pepsi 1.5"],
		["🔙 Ortga"],
	])
		.resize()
		.oneTime();
};

const getNumberKeyboard = () => {
	return Markup.keyboard([
		["1", "2", "3"],
		["4", "5", "🔙 Ortga"],
	])
		.resize()
		.oneTime();
};

const getCategoryKeyboard = () => {
	return Markup.keyboard([
		["🌯 Lavash", " 🍕 Pitsa"],
		["🥫 Sous", "🥤 Ichimliklar"],
		["🔙 Ortga qaytish"],
		["✅ Buyurtmani rasmiylashtirish"],
	])
		.resize()
		.oneTime();
};

const getAdminKeyboard = () => {
	return Markup.keyboard([
		["📦📜 Barcha buyurtmalarni ko'rish"],
		["🆔🔍 ID orqali buyurtmani qidirish"],
		["🔙 Ortga"],
	])
		.resize()
		.oneTime();
};

const getMainKeyboard = () => {
	return Markup.keyboard([
		["🍽 Buyurtma berishni boshlash"],
		["📜 Buyurtmalarim tarixi"],
		["⚡️ ADMIN PANEL"],
	]).resize();
};

module.exports = {
	getCategoryKeyboard,
	products,
	priceProducts,
	getLavashKeyboard,
	getPizzaKeyboard,
	getNumberKeyboard,
	getSousKeyboard,
	getDrinkKeyboard,
	getAdminKeyboard,
	getMainKeyboard,
};
