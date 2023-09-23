import Joi from "joi";
import { PRODUCT_TYPE } from "../../../entities/product/products.entity";

export const updateProductSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    description: Joi.string().min(1).optional(),
    imageUrl: Joi.string().min(1).optional(),
    price: Joi.number().optional(),
    categoryId: Joi.number().optional(),
    brandId: Joi.number().optional(),
    productType: Joi.string().valid(...Object.values(PRODUCT_TYPE)).required(),

});
