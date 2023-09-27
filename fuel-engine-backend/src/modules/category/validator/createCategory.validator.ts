import Joi from "joi";

export const createCategorySchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).optional(),
    imageUrl: Joi.string().optional(),
}).options({ allowUnknown: true });
