import { closeSessionRepository } from '../../repository/authRepository.js';

export async function logout(req, res) {

    try {

        await closeSessionRepository(res.locals.refreshTokenUuid);

        res.sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);

    }

}