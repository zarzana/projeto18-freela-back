import bcrypt from 'bcrypt';
import { getUsersWithEmailRepository, insertSessionRepository, insertTokenRepository } from '../../repository/authRepository.js';
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

        // create access token
        const accessToken = jwt.sign({ user_id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });

        // create refresh token
        const token_id = uuid();
        const refreshToken = jwt.sign({ token_id: token_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60d' });

        // create session in db
        let session_id = await insertSessionRepository(user.user_id);
        session_id = Object.values(session_id.rows[0])[0];
        console.log(session_id)

        // create token in db
        await insertTokenRepository(token_id, session_id);

        // send cookies!
        res
            .cookie('accessToken', accessToken, { maxAge: 30 * 60 * 1000, httpOnly: true })  // 30 minutes
            .cookie('refreshToken', refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true })  // 60 days
            .sendStatus(200);

    } catch (err) {

        res.status(500).send(err.message);

    }

}