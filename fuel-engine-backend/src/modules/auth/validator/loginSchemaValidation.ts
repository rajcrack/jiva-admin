import Joi from "joi";

export const loginSchema = Joi.object({
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(2).required()
});
