import { v4 as uuid } from 'uuid';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../utils/jwtUtils.js';
import { updateSessionRepository } from '../../repository/authRepository.js';
import { setAccessTokenCookie, setRefreshTokenCookie } from '../../utils/cookieUtils.js';

dotenv.config();

export async function refreshSession(req, res) {
    
    try {

        const token_uuid = verifyRefreshToken(req.cookies.refreshToken).refresh_uuid;
        const new_token_uuid = uuid();
        const dbResponse = await updateSessionRepository(token_uuid, new_token_uuid);
        if (dbResponse.rows.length === 0) { return res.sendStatus(401) };  // this is where automatic reuse detection would be

        // create token pair
        const accessToken = createAccessToken(Object.values(dbResponse.rows[0])[0]);
        const newRefreshToken = createRefreshToken(new_token_uuid);

        // send cookies!
        setAccessTokenCookie(res, accessToken);
        setRefreshTokenCookie(res, newRefreshToken);
        res.sendStatus(200);

    } catch (error) {

        if (error.message === 'invalid signature') { return res.sendStatus(401) };
        if (error.message === 'jwt expired') { return res.sendStatus(401) };
        res.status(500).send(error.message);

    }

}