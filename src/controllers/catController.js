import { db } from "../database/database.js";

export async function postCat(req, res) {

    const { cat_name, available, breed_id, male, birthday, description } = req.body;
    const userId = res.locals.userId;

    try {

        await db.query(`
        INSERT
            INTO "cat" ("user_id", "cat_name", "available", "breed_id", "male", "birthday", "description")
        VALUES
            ('${userId}', '${cat_name}', '${available}', '${breed_id}',
            ${male != null ? male : 'NULL'},
            ${birthday != null ? "'" + birthday + "'" : 'NULL'},
            ${description != null ? "'" + description + "'" : 'NULL'})`
        );

        res.sendStatus(201);

    } catch (err) {

        res.status(500).send(err.message);

    }

}

export async function getCat(req, res) {

    try {

        const dbReponse = await db.query(`
            SELECT cat_id, cat_name, breed_name, male, birthday, description
            FROM "cat"
            JOIN "breed"
                ON "cat".breed_id = "breed".breed_id
            WHERE available = TRUE
        `);
        res.status(200).send(dbReponse.rows);

    } catch (error) {

        res.status(500).send(error.message);

    }

}

export async function getCatById(req, res) {

    const catId = req.params.id;

    try {

        const dbReponse = await db.query(`
            SELECT cat_name, breed_name, male, birthday, description, "user".user_id, name, icon, phone, email, profile
            FROM "cat"
            JOIN "breed"
                ON "cat".breed_id = "breed".breed_id
            JOIN "user"
                ON "cat".user_id = "user".user_id
            WHERE "cat_id" = ${catId} AND available = TRUE
        `);
        res.status(200).send(dbReponse.rows[0]);

    } catch (error) {

        res.status(500).send(error.message);

    }

}

export async function patchCatAvailability(req, res) {

    const catId = req.params.id;

    try {

        await db.query(`
            UPDATE "cat"
            SET available = NOT available
            WHERE "cat_id" = ${catId}
        `);
        res.sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);

    }

}