import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(10).required(),
    password: Joi.string().min(2).required(),
    username: Joi.string().min(2).required(),
    businessName: Joi.string().min(2).required(),
    state: Joi.string().min(2).required(),
    district: Joi.string().min(2).required(),
    address: Joi.string().min(2).required(),
});
