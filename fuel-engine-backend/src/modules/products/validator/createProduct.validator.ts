import Joi from "joi";
import { PRODUCT_TYPE } from "../../../entities/product/products.entity";

export const createProductSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).optional(),
    imageUrl: Joi.string().min(1).optional(),
    price: Joi.number().required(),
    productType: Joi.string().valid(...Object.values(PRODUCT_TYPE)).required(),
    categoryId: Joi.number().required(),
    brandId: Joi.number().required(),
});
