import { signupSchema } from "./schemas/authSchemas.js";

export function signupValidator(req, res, next) {

    const validation = signupSchema.validate(req.body);

    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }

    next();

}