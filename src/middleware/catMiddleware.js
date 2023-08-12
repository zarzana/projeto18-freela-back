import { postCatSchema } from "./schemas/catSchemas.js";

export function postCatValidator(req, res, next) {
    const validation = postCatSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send(validation.error.message);
    }
    next();
}