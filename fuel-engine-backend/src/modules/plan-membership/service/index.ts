import { AppDataSource } from "../../../config/db/config";
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { Plan } from "../../../entities/plan/plan.entity";
import { paginationSchema } from "../../../common/pagination/pagination.validator";
import { PlanMembership } from "../../../entities/plan/plan-membership.entity";
import { MoreThan } from "typeorm";
import { createPlanMembershipSchema } from "../validator";
import { USER_TYPE, Users } from "../../../entities/user/user.entity";

class PlanMembershipService {

    async createPlanMembership(req: any, res: any) {
        const {id:userId} =req.user
        const validatedData = validateRequest(req.body, createPlanMembershipSchema);
        const planMembershipRepository = AppDataSource.getRepository(PlanMembership);
        const userRepository = AppDataSource.getRepository(Users);

        const planRepository = AppDataSource.getRepository(Plan);
        const plan = await planRepository.findOne({
            where:{
                id:validatedData.planId
            }
        })
             const user = await userRepository.findOne({
            where:{
                id:userId
            }
        })
        if(!plan){
            throw CustomError(`Could not find plan with id ${validatedData.planId}`, 404);
        }
        const expiresAt = new Date(new Date().getTime()+(plan.expiresIn*24*60*60*1000));
        const planMembershipToBeCreated = planMembershipRepository.create({

            user:{id:userId},plan:{
                id:validatedData.planId
            },
            transactionId:validatedData.transactionId,
            expiresAt
        })

        await planMembershipRepository.save(planMembershipToBeCreated);
user.userType = USER_TYPE.PAID
        await userRepository.save(user)
        const userActiveMembership = this.userActiveMembership(req,res);
        return userActiveMembership;

    }
    async updatePlan(req: any, res: any) {
        const { id } = req.params;
        const validatedData = validateRequest(req.body, createPlanMembershipSchema);
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
    async userActiveMembership(req: any, res: any) {
        const {id:userId} = req.user;
        const planMembershipRepository = AppDataSource.getRepository(PlanMembership);
        const activeMembership= await planMembershipRepository.findOne({
            relations:{
                plan:true,
            },
            where:{
                user:{
                    id:userId
                },
                isActive:true,
                expiresAt:MoreThan(new Date()),
            },
            select:{
                id:true,
                expiresAt:true,
                plan:{
                    id:true,
                    name:true,
                    noOfProductsAllowed:true,
                    isActive:true
                },
            }
        })

        return activeMembership


    }


}

export const planMembershipService = new PlanMembershipService();
