import { db } from "../database/database.js";
import dayjs from "dayjs";

export async function createUserRepository(name, email, passwordHash, cpf, phone) {
	return db.query(`INSERT INTO "user" (name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5);`, [name, email, passwordHash, cpf, phone]);
}

export async function getUsersWithEmailRepository(email) {
	return db.query(`SELECT * FROM "user" WHERE "email" = '${email}'`);
}

export async function insertSessionRepository(user_id, refresh_uuid) {
	return db.query(`INSERT INTO "session" (user_id, refresh_uuid) VALUES ($1, $2) RETURNING session_id`, [user_id, refresh_uuid])
}

export async function updateSessionRepository(token_uuid, new_token_uuid) {
	return db.query(`
		UPDATE "session"
		SET "refresh_uuid" = '${new_token_uuid}',
			"last_refresh" = '${dayjs().format('YYYY-MM-DD HH:mm:ssZ')}'
		WHERE "refresh_uuid" = '${token_uuid}'
		RETURNING "user_id"
	`)
}