import joi from "joi";

export const postCatSchema = joi.object({
    cat_name: joi.string().pattern(/[a-zA-Z0-9 ]/).required(),
    available: joi.boolean().required(),
    breed_id: joi.number().min(1).max(103).required(),
    male: joi.boolean().required().allow(null),
    birthday: joi.date().required().allow(null),
    description: joi.string().required().allow(null).allow(''),
    image_url: joi.string().required(),
});