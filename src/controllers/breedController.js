import { db } from "../database/database.js";

export async function getBreeds(req, res) {

    try {

        const breedResponse = await db.query(`SELECT "breed".breed_id, "breed".breed_name FROM "breed"`);
        res.send(breedResponse.rows);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getBreedCategories(req, res) {

    try {

        const categoryResponse = await db.query(`SELECT breed_category_name FROM "breed_category"`);
        res.send(categoryResponse.rows.map(e => e.breed_category_name));

    } catch (err) {

        res.status(500).send(err.message);

    }

}