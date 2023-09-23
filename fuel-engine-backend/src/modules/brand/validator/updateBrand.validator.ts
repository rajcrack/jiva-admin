import Joi from "joi";

export const updateBrandSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    description: Joi.string().min(1).optional(),
    imageUrl: Joi.string().min(1).optional(),
});
