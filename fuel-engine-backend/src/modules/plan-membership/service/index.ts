import { AppDataSource } from "../../../config/db/config";
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { createPlanSchema } from "../validator";
import { Plan } from "../../../entities/plan/plan.entity";
import { updateBrandSchema } from "../../brand/validator";
import { paginationSchema } from "../../../common/pagination/pagination.validator";

class PlanService {

    async createPlan(req: any, res: any) {
        const validatedData = validateRequest(req.body, createPlanSchema);
        const planRepository = AppDataSource.getRepository(Plan);

        const planToBeCreated = planRepository.create({
            name: validatedData.name,
            noOfProductsAllowed: validatedData.noOfProductsAllowed,
            expiresIn: validatedData.expiresIn
        })

        const plan = await planRepository.save(planToBeCreated);


        return plan;

    }
    async updatePlan(req: any, res: any) {
        const { id } = req.params;
        const validatedData = validateRequest(req.body, updateBrandSchema);
        const planRepository = AppDataSource.getRepository(Plan);

        const plan = await planRepository.findOne({
            where: {
                id: id,
            }
        });
        if (plan) {
            throw CustomError(`Could not find plan with id ${id}`, 404);
        }
        plan.name = validatedData.name;
        plan.noOfProductsAllowed = validatedData.noOfProductsAllowed;
        plan.expiresIn = validatedData.expiresIn;

        await planRepository.save(plan);
        return plan;


    }
    async deletePlan(req: any, res: any) {
        const { id } = req.params;
        const planRepository = AppDataSource.getRepository(Plan);
        const plan = await planRepository.findOne({
            where: {
                id: id,
            }
        });
        if (plan) {
            throw CustomError(`Could not find plan with id ${id}`, 404);
        }
        await planRepository.remove(plan);
        return true;

    }
    async getPlanById(req: any, res: any) {
        const { id } = req.params;
        const planRepository = AppDataSource.getRepository(Plan);
        const plan = await planRepository.findOne({
            where: {
                id: id,
            }
        });
        if (plan) {
            throw CustomError(`Could not find plan with id ${id}`, 404);
        }
        return plan;

    }
    async getPlanList(req: any, res: any) {
        const { limit = 10, page = 1 } = validateRequest(req.query, paginationSchema);
        const skip = limit * (page - 1);

        const planRepository = AppDataSource.getRepository(Plan);
        const [planList, count] = await planRepository.findAndCount({
            take: limit,
            skip: skip,
            order: { createdAt: 'DESC' }
        })

        return {
            planList, count
        };


    }

}

export const planService = new PlanService();
