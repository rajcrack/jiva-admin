import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { planService } from '../service';
export const planRoutes = Router();


planRoutes.post('/', async (req: Request, res: any) => {
    try {
        await planService.createPlan(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
planRoutes.put('/:id', async (req: Request, res: any) => {
    try {
        const data = await planService.updatePlan(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
planRoutes.delete('/:id', async (req: Request, res: any) => {
    try {
        const data = await planService.deletePlan(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


planRoutes.get('/:id', async (req: Request, res: any) => {
    try {
        const data = await planService.getPlanById(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
planRoutes.get('/list', async (req: Request, res: any) => {
    try {
        const data = await planService.getPlanList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


