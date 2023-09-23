import Joi from "joi";
import { PRODUCT_TYPE } from "../../../entities/product/products.entity";

export const productListSchema = Joi.object({
    categoryIds: Joi.string().min(1).optional(),
    brandIds: Joi.string().min(1).optional(),
    productType: Joi.string().valid(...Object.values(PRODUCT_TYPE)).optional()
});
