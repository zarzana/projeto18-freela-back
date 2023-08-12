import { db } from "../database/database.js";

export async function postCat(req, res) {

    const { cat_name, available, breed_id, male, birthday, description } = req.body;
    const userId = res.locals.userId;

    await db.query(`
    INSERT
        INTO "cat" ("user_id", "cat_name", "available", "breed_id", "male", "birthday", "description")
    VALUES
        ('${userId}', '${cat_name}', '${available}', '${breed_id}', '${male}', '${birthday}', '${description}')`
    );

    res.sendStatus(201);

}