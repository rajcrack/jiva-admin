import Joi from "joi";

export const createPlanSchema = Joi.object({
    name: Joi.string().min(10).required(),

    noOfProductsAllowed: Joi.number().required(),

    expiresIn: Joi.number().min(1).required()
});
