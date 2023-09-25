import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { adminService } from '../service';
export const adminRoutes = Router();


adminRoutes.post('/login', async (req: Request, res: any) => {
    try {
        await adminService.login(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})

