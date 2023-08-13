import bcrypt from 'bcrypt';
import { getUsersWithEmailRepository, insertSessionRepository } from '../../repository/authRepository.js';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function login(req, res) {

    const { email, password } = req.body;

    try {

        // check if email and password match
        const users = await getUsersWithEmailRepository(email);
        const user = users.rows[0];
        if (!users.rows.length > 0 || !bcrypt.compareSync(password, user.password)) {
            return res.sendStatus(401);
        };

        // create session in db
        const refresh_uuid = uuid();
        const session_id_response = await insertSessionRepository(user.user_id, refresh_uuid);
        const session_id = Object.values(session_id_response.rows[0])[0];  // in case it's needed in the future

        // create token pair
        const accessToken = jwt.sign({ user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ refresh_uuid: refresh_uuid }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        // send cookies!
        res
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })  // 1 hour
            .cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/api/auth' })  // 30 days
            .sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);

    }

}