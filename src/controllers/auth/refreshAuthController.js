import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import { createAccessToken, createRefreshToken } from '../../utils/jwtUtils.js';
import { updateSessionRepository } from '../../repository/authRepository.js';

dotenv.config();

export async function refreshSession(req, res) {

    try {

        const NewRefreshTokenUuid = uuid();
        const dbResponse = await updateSessionRepository(res.locals.refreshTokenUuid, NewRefreshTokenUuid);
        if (dbResponse.rows.length === 0) { return res.sendStatus(401) };  // this is where automatic reuse detection would be

        // create token pair
        const accessToken = createAccessToken(Object.values(dbResponse.rows[0])[0]);
        const newRefreshToken = createRefreshToken(NewRefreshTokenUuid);

        // send cookies!
        res
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true })  // 1 hour
            .cookie('refreshToken', newRefreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/auth' })  // 30 days
            .sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);

    }

}