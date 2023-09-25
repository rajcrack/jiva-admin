import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { planMembershipService } from '../service';
export const planRoutes = Router();


planRoutes.post('/user/membership', async (req: Request, res: any) => {
    try {
        await planMembershipService.createPlanMembership(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
planRoutes.put('/:id', async (req: Request, res: any) => {
    try {
        const data = await planMembershipService.updatePlan(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
planRoutes.delete('/:id', async (req: Request, res: any) => {
    try {
        const data = await planMembershipService.deletePlan(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


planRoutes.get('/:id', async (req: Request, res: any) => {
    try {
        const data = await planMembershipService.getPlanById(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
planRoutes.get('/list', async (req: Request, res: any) => {
    try {
        const data = await planMembershipService.getPlanList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})

planRoutes.get('/user/active-membership', async (req: Request, res: any) => {
    try {
        const data = await planMembershipService.getPlanList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


