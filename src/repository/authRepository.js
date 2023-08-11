import { db } from "../database/database.js";

export async function createUserRepository (name, email, passwordHash, cpf, phone) {
	return db.query(`INSERT INTO "user" (name, email, password, cpf, phone) VALUES ($1, $2, $3, $4, $5);`,[name, email, passwordHash, cpf, phone]);
}