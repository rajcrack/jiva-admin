import Joi from "joi";

export const createPlanMembershipSchema = Joi.object({
    transactionId: Joi.string().min(1).required(),

    planId: Joi.number().required(),

});
