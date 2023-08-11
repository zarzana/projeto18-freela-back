import bcrypt from 'bcrypt';
import { getUsersWithEmailRepository, insertSessionRepository } from '../../repository/authRepository.js';
import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { createAccessToken, createRefreshToken } from '../../utils/jwtUtils.js';
import { setAccessTokenCookie, setRefreshTokenCookie } from '../../utils/cookieUtils.js';

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
        const accessToken = createAccessToken(user.user_id);
        const refreshToken = createRefreshToken(refresh_uuid);

        // send cookies!
        setAccessTokenCookie(res, accessToken);
        setRefreshTokenCookie(res, refreshToken);
        res.sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);

    }

}