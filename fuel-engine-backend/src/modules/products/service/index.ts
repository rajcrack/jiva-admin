import { AppDataSource } from "../../../config/db/config";
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { createProductSchema, productListSchema, updateProductSchema } from "../validator";
import { Product } from "../../../entities/product/products.entity";
import { paginationSchema } from "../../../common/pagination/pagination.validator";
import { FindOptionsWhere, ILike, In, Like } from "typeorm";

class ProductService {

    async createProduct(req: any, res: any) {
        const validatedData = validateRequest(req.body, createProductSchema);
        const productRepository = AppDataSource.getRepository(Product);

        const productToBeCreated = productRepository.create({
            name: validatedData.name,
            description: validatedData.description,
            imageUrl: validatedData.imageUrl,
            price: validatedData.price,
            brand: { id: validatedData.brandId },
            category: { id: validatedData.categoryId },
            productType: validatedData.productType
        })

        const product = await productRepository.save(productToBeCreated);


        return product;

    }

    async updateProduct(req: any, res: any) {
        const { id } = req.params;
        const validatedData = validateRequest(req.body, updateProductSchema);
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id: id,
            }
        });
        if (product) {
            throw CustomError(`Could not find product with id ${id}`, 404);
        }
        product.name = validatedData.name;
        product.description = validatedData.description;
        product.imageUrl = validatedData.imageUrl;

        product.price = validatedData.price;
        product.brand.id = validatedData.brandId;
        product.category.id = validatedData.categoryId;
        product.productType = validatedData.productType;


        await productRepository.save(product);
        return product;
    }

    async getProductById(req: any, res: any) {
        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({
            where: {
                id: id,
            }
        });
        if (product) {
            throw CustomError(`Could not find product with id ${id}`, 404);
        }
        return product;

    }
    async getProductList(req: any, res: any) {

        const { limit = 10, page = 1, keyword } = validateRequest(req.query, paginationSchema);
        const { brandIds, categoryIds, productType } = validateRequest(req.query, productListSchema);;

        const skip = limit * (page - 1);

        const productRepository = AppDataSource.getRepository(Product);
        const where: FindOptionsWhere<Product> = {
        }
        if (keyword) {
            where.name = Like(`%${keyword}%`);
        }
        if (brandIds) {
            where.brand = { id: In(brandIds) };
        }
        if (categoryIds) {
            where.category = { id: In(categoryIds) };
        }
        if (productType) {
            where.productType = productType;
        }
        const [productList, count] = await productRepository.findAndCount({
            where,
            take: limit,
            skip: skip,
            order: { createdAt: 'DESC' }
        })

        return {
            productList, count
        };



    }

    async deleteProduct(req: any, res: any) {

        const { id } = req.params;
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOne({
            where: {
                id: id,
            }
        });
        if (product) {
            throw CustomError(`Could not find product with id ${id}`, 404);
        }
        await productRepository.remove(product);
        return true;


    }

    //---------------- Helper Functions -------------------//

}

export const productService = new ProductService();
