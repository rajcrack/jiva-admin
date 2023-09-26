import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { adminService } from '../service';
import { date } from 'joi';
export const adminRoutes = Router();


adminRoutes.post('/login', async (req: Request, res: any) => {
    try {
        const data =await adminService.login(req, res);
        successResponseHandler(res,data)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})

