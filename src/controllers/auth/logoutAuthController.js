import { closeSessionRepository } from '../../repository/authRepository.js';
import { verifyRefreshToken } from '../../utils/jwtUtils.js';
import { clearCookies } from '../../utils/cookieUtils.js';

export async function logout(req, res) {

    try {

        const token_uuid = verifyRefreshToken(req.cookies.refreshToken).refresh_uuid;
        await closeSessionRepository(token_uuid);

        // delete cookies!
        clearCookies(res);
        res.sendStatus(200);

    } catch (error) {

        if (error.message === 'invalid signature') { return res.sendStatus(401) };
        if (error.message === 'jwt expired') { return res.sendStatus(401) };
        res.status(500).send(error.message);

    }

}