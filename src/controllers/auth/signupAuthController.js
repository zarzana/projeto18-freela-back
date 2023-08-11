import bcrypt from 'bcrypt';
import { createUserRepository } from "../../repository/authRepository.js";

export async function signup(req, res) {

    const { name, email, password, cpf, phone } = req.body;

    try {

        // password encryption
        const passwordHash = bcrypt.hashSync(password, 10);

        // create user in db
        await createUserRepository(name, email, passwordHash, cpf, phone);
        res.sendStatus(201);

    } catch (error) {

        const duplicateEmailErrorMessage = 'duplicate key value violates unique constraint "user_email_key"';
        const duplicateCpfErrorMessage = 'duplicate key value violates unique constraint "user_cpf_key"';

        if (error.message === duplicateEmailErrorMessage) { return res.status(409).send('E-mail already registered.') };
        if (error.message === duplicateCpfErrorMessage) { return res.status(409).send('CPF already registered.') };

        res.status(500).send(error.message);

    }

}