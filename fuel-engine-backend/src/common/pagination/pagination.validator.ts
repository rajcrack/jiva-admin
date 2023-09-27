import Joi from "joi";

export const paginationSchema = Joi.object({
    limit: Joi.number().default(10).optional(),
    page: Joi.number().default(1).optional(),
    keyword: Joi.string().allow('').optional(),

});
