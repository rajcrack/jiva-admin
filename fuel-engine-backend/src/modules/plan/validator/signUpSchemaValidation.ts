import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().min(2).required(),
    phone: Joi.string().min(10).required(),
    email: Joi.string().email().optional(),   
    otp: Joi.number().required(),

});
