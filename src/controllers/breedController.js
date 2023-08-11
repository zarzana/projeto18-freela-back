import { db } from "../database/database.js";

export async function getBreeds(req, res) {

    try {

        const breedResponse = await db.query(`SELECT "breed".breed_id, "breed".breed_name FROM "breed"`);
        res.send(breedResponse.rows);

    } catch (err) {

        res.status(500).send(err.message);

    }

}