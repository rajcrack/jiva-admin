import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { userService } from '../service';
export const userRoutes = Router();


userRoutes.get('/profile', async (req: Request, res: any) => {
    try {
        await userService.profile(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})

