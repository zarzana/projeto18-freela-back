import { db } from "../database/database.js";

export async function getUserById(req, res) {

    const userId = req.params.id;

    try {

        const dbReponse = await db.query(`
            SELECT name, icon, email, phone, profile, cat_id, cat_name, breed_name, male, birthday, description
            FROM "user"
            LEFT JOIN "cat"
                USING (user_id)
            LEFT JOIN "breed"
                USING (breed_id)
            WHERE user_id = ${userId} AND available IS NOT FALSE;
        `);

        let catArray = dbReponse.rows.map(({
            name, icon, email, phone, profile, ...keepAttrs
        }) => keepAttrs);
        if (catArray[0].cat_id === null) { catArray = [] };
        const userInformation = dbReponse.rows.map(({
            cat_id, cat_name, breed_name, male, birthday, description, ...keepAttrs
        }) => keepAttrs)[0];
        userInformation.cats = catArray;

        res.status(200).send(userInformation);

    } catch (error) {

        res.status(500).send(error.message);

    }

}

export async function getUserCats(req, res) {

    const userId = res.locals.userId;

    try {

        const dbReponse = await db.query(`
            SELECT cat_id, cat_name, available, breed_name, male, birthday, description, image_url
            FROM "user"
            LEFT JOIN "cat"
                USING (user_id)
            LEFT JOIN "breed"
                USING (breed_id)
            WHERE user_id = ${userId};
        `);

        let catArray = dbReponse.rows;
        if (catArray[0].cat_id === null) { catArray = [] };

        res.status(200).send(catArray);

    } catch (error) {

        res.status(500).send(error.message);

    }

}