import { AppDataSource } from "../../../config/db/config";
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { createBrandSchema, updateBrandSchema } from "../validator";
import { Brand } from "../../../entities/product/brand.entity";
import { paginationSchema } from "../../../common/pagination/pagination.validator";

class BrandService {

    async createBrand(req: any, res: any) {
        const validatedData = validateRequest(req.body, createBrandSchema);
        const brandRepository = AppDataSource.getRepository(Brand);

        const brandToBeCreated = brandRepository.create({
            name: validatedData.name,
            description: validatedData.description,
            imageUrl: validatedData.imageUrl
        })

        const brand = await brandRepository.save(brandToBeCreated);


        return brand;

    }
    async updateBrand(req: any, res: any) {
        const { id } = req.params;
        const validatedData = validateRequest(req.body, updateBrandSchema);
        const brandRepository = AppDataSource.getRepository(Brand);

        const brand = await brandRepository.findOne({
            where: {
                id: id,
            }
        });
        if (brand) {
            throw CustomError(`Could not find brand with id ${id}`, 404);
        }
        brand.name = validatedData.name;
        brand.description = validatedData.description;
        brand.imageUrl = validatedData.imageUrl;

        await brandRepository.save(brand);
        return brand;

    }
    async deleteBrand(req: any, res: any) {
        const { id } = req.params;
        const brandRepository = AppDataSource.getRepository(Brand);
        const brand = await brandRepository.findOne({
            where: {
                id: id,
            }
        });
        if (brand) {
            throw CustomError(`Could not find brand with id ${id}`, 404);
        }
        await brandRepository.remove(brand);
        return true;

    }
    async getBrandById(req: any, res: any) {
        const { id } = req.params;
        const brandRepository = AppDataSource.getRepository(Brand);
        const brand = await brandRepository.findOne({
            where: {
                id: id,
            }
        });
        if (brand) {
            throw CustomError(`Could not find brand with id ${id}`, 404);
        }
        return brand;
    }
    async getBrandList(req: any, res: any) {
        const { limit = 10, page = 1 } = validateRequest(req.query, paginationSchema);
        const skip = limit * (page - 1);

        const brandRepository = AppDataSource.getRepository(Brand);
        const [brandList, count] = await brandRepository.findAndCount({
            take: limit,
            skip: skip,
            order: { createdAt: 'DESC' }
        })

        return {
            brandList, count
        };

    }
}

export const brandService = new BrandService();
