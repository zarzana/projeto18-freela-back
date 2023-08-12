import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { closeSessionRepository } from '../repository/authRepository.js';

dotenv.config();

export async function validateRefreshToken(req, res, next) {

    try {

        const refreshTokenUuid = jwt.verify(res.locals.refreshToken, process.env.REFRESH_TOKEN_SECRET).refresh_uuid;
        res.locals.refreshTokenUuid = refreshTokenUuid;

        next();

    } catch (error) {

        if (error.message === 'invalid signature') { return res.sendStatus(401) };
        if (error.message === 'jwt expired') {
            await closeSessionRepository(jwt.decode(res.locals.refreshToken).refresh_uuid);
            return res.sendStatus(401);
        };
        if (error.message === 'invalid token') {
            return res.status(500).send('invalid token');
        }

        res.status(500).send(error.message);

    }

    return jwt.verify(res.locals.refreshToken, process.env.REFRESH_TOKEN_SECRET);

}

export function verifyAcessToken(req, res, next) {

    try {

        const userId = jwt.verify(res.locals.accessToken, process.env.ACCESS_TOKEN_SECRET).user_id;
        res.locals.userId = userId;

        next();

    } catch (error) {

        if (error.message === 'invalid signature') { return res.sendStatus(401) };
        if (error.message === 'jwt expired') { return res.sendStatus(401) };
        if (error.message === 'invalid token') { return res.sendStatus(400) };

        res.status(500).send(error.message);

    }

}