import Joi from "joi";

export const paginationSchema = Joi.object({
    limit: Joi.number().default(10).optional(),
    offset: Joi.number().default(1).optional(),
    keyword: Joi.string().min(1).optional(),

});
