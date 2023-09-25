import Joi from "joi";

export const updatePlanSchema = Joi.object({
    name: Joi.string().min(10).optional(),

    noOfProductsAllowed: Joi.number().optional(),

    expiresIn: Joi.number().min(1).optional()
});
