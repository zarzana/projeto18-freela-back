import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../utils/jwtUtils.js';
import { updateSessionRepository } from '../../repository/authRepository.js';

dotenv.config();

export async function refreshSession(req, res) {

    try {

        const token_uuid = verifyRefreshToken(res.locals.refreshToken).refresh_uuid;
        const new_token_uuid = uuid();
        const dbResponse = await updateSessionRepository(token_uuid, new_token_uuid);
        if (dbResponse.rows.length === 0) { return res.sendStatus(401) };  // this is where automatic reuse detection would be

        // create token pair
        const accessToken = createAccessToken(Object.values(dbResponse.rows[0])[0]);
        const newRefreshToken = createRefreshToken(new_token_uuid);

        // send cookies!
        res
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })  // 1 hour
            .cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/auth' })  // 30 days
            .sendStatus(200);

    } catch (error) {

        if (error.message === 'invalid signature') { return res.sendStatus(401) };
        if (error.message === 'jwt expired') { return res.sendStatus(401) };
        res.status(500).send(error.message);

    }

}