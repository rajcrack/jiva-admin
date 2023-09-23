import Joi from "joi";
export enum OperationType {
    SIGN_UP = "signup",
    LOGIN = "login"
}
export const generateOTPSchema = Joi.object({
    phone: Joi.string().min(10).required(),
    operationType: Joi.string().valid(...Object.values(OperationType)).required()
});
