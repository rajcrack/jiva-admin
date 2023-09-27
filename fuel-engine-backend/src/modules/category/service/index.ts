import { AppDataSource } from "../../../config/db/config";
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { createCategorySchema, updateCategorySchema, } from "../validator";
import { Category } from "../../../entities/product/catgeory.entity";
import { paginationSchema } from "../../../common/pagination/pagination.validator";
import { FindOptionsWhere, Like } from "typeorm";

class CategoryService {

    async createCategory(req: any, res: any) {

        const validatedData = validateRequest(req.body, createCategorySchema);
        const categoryRepository = AppDataSource.getRepository(Category);

        const categoryToBeCreated = categoryRepository.create({
            name: validatedData.name,
            description: validatedData.description,
            imageUrl: validatedData.imageUrl || ' '
        })

        const category = await categoryRepository.save(categoryToBeCreated);


        return category;

    }
    async updateCategory(req: any, res: any) {
        const { id } = req.params;
        const validatedData = validateRequest(req.body, updateCategorySchema);
        const categoryRepository = AppDataSource.getRepository(Category);

        const category = await categoryRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!category) {
            throw CustomError(`Could not find category with id ${id}`, 404);
        }
        category.name = validatedData.name;
        category.description = validatedData.description;
        category.imageUrl = validatedData.imageUrl;

        await categoryRepository.save(category);
        return category;

    }
    async deleteCategory(req: any, res: any) {
        const { id } = req.params;
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!category) {
            throw CustomError(`Could not find category with id ${id}`, 404);
        }
        await categoryRepository.remove(category);
        return true;
    }
    async getCategoryById(req: any, res: any) {
        const { id } = req.params;
        const categoryRepository = AppDataSource.getRepository(Category);
        const category = await categoryRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!category) {
            throw CustomError(`Could not find category with id ${id}`, 404);
        }
        return category;
    }
    async getCategoryList(req: any, res: any) {
        const { limit = 10, page = 1 ,keyword=''} = validateRequest(req.query, paginationSchema);
        const skip = limit * (page - 1);

        const categoryRepository = AppDataSource.getRepository(Category);
        const              where: FindOptionsWhere<Category> = {}

        if(keyword && keyword !==''){
            where.name = Like(`%${keyword}%`)
        }
        const [categoryList, count] = await categoryRepository.findAndCount({
            where,
            take: limit,
            skip: skip,
            order: { createdAt: 'DESC' }
        })

        return {
            categoryList, count
        };


    }


}

export const categoryService = new CategoryService();
