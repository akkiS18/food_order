const pool = require("../config/db");

async function addUser(user) {
	try {
		const { id, username, phone } = user; // foydalanuvchidan kerakli qiymatlarni ajratamiz

		// `users` jadvaliga faqat kerakli ustunlarni kiritamiz
		const query = `
      INSERT INTO users (id, username, phone)
      VALUES ($1, $2, $3)
      RETURNING id;`;

		const result = await pool.query(query, [id, username, phone]);
		console.log(
			"Foydalanuvchi muvaffaqiyatli qo‘shildi! ID:",
			result.rows[0].id
		);
	} catch (error) {
		console.error("Foydalanuvchini qo‘shishda xatolik:", error);
	}
}

async function getUsers() {
	try {
		const query = "SELECT * FROM users;";
		const result = await pool.query(query);
		return result.rows; // Foydalanuvchilarni qaytaradi
	} catch (error) {
		console.error("Foydalanuvchilarni olishda xatolik:", error);
		return [];
	}
}

module.exports = { addUser, getUsers };
