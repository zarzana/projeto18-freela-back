import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});