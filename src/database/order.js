const pool = require("../config/db");

async function addOrder(user_id, orderItems, status = "pending") {
	try {
		const query = `
      INSERT INTO orders (user_id, order_items, status)
      VALUES ($1, $2, $3)
      RETURNING order_id;
    `;

		// orderItems ni massiv sifatida saqlash
		const res = await pool.query(query, [user_id, [orderItems], status]);

		console.log(
			"Buyurtma muvaffaqiyatli qo‘shildi! Order ID:",
			res.rows[0].order_id
		);
		return res.rows[0].order_id;
	} catch (error) {
		console.error("Buyurtmani qo‘shishda xatolik:", error);
	}
}

// 🟢 Foydalanuvchining barcha buyurtmalarini olish
async function getUserOrders(user_id) {
	try {
		const query = `SELECT order_id, order_items, status FROM orders WHERE user_id = $1;`;
		const res = await pool.query(query, [user_id]);

		// Foydalanuvchining barcha buyurtmalarini qaytaradi, order_items ni massiv sifatida qaytaramiz
		return res.rows.map((order) => ({
			...order,
			order_items: order.order_items, // order_items massiv sifatida qaytariladi
		}));
	} catch (error) {
		console.error("Foydalanuvchining buyurtmalarini olishda xatolik:", error);
		return [];
	}
}


// 🔵 Bitta buyurtmani order_id bo‘yicha olish
async function getOrder(order_id) {
	try {
		const query = `SELECT order_id, order_items, status FROM orders WHERE order_id = $1;`;
		const res = await pool.query(query, [order_id]);

		return res.rows[0]
			? {
					...res.rows[0],
					order_items: res.rows[0].order_items, // order_items massiv sifatida qaytariladi
			  }
			: null;
	} catch (error) {
		console.error("Buyurtmani olishda xatolik:", error);
		return null;
	}
}


// 🟠 Barcha buyurtmalarni olish
async function getAllOrders() {
	try {
		const query = `SELECT order_id, user_id, order_items, status FROM orders;`;
		const res = await pool.query(query);

		return res.rows.map((order) => ({
			...order,
			order_items: order.order_items, // order_items massiv sifatida qaytariladi
		}));
	} catch (error) {
		console.error("Barcha buyurtmalarni olishda xatolik:", error);
		return [];
	}
}


module.exports = { addOrder, getUserOrders, getOrder, getAllOrders };
