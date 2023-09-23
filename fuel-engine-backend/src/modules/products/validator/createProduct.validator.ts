import Joi from "joi";

export const createProductSchema = Joi.object({
    phone: Joi.string().min(10).required(),
});
