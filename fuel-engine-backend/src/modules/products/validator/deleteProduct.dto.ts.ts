import Joi from "joi";

export const verifyOTPSchema = Joi.object({
    phone: Joi.string().min(10).required(),
    otp: Joi.number().required(),
});
