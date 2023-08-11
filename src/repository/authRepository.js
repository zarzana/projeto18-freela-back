import { db } from "../database/database.js";

export async function createUserRepository(name, email, passwordHash, cpf, phone) {
	return db.query(`INSERT INTO "user" (name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5);`, [name, email, passwordHash, cpf, phone]);
}

export async function getUsersWithEmailRepository(email) {
	return db.query(`SELECT * FROM "user" WHERE "email" = '${email}'`);
}

export async function insertSessionRepository(user_id) {
	return db.query(`INSERT INTO "session" (user_id) VALUES ($1) RETURNING session_id`, [user_id])
}

export async function insertTokenRepository(token_id, session_id) {
	return db.query(`INSERT INTO "token" (token_id, session_id) VALUES ($1, $2)`, [token_id, session_id])
}