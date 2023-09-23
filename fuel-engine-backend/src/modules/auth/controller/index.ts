import { Router } from 'express';
import { authService } from '../service';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
export const authRoutes = Router();


authRoutes.post('/shop/signup', async (req: Request, res: any) => {
    try {
        const data = await authService.signUp(req, res);
        successResponseHandler(res, data)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
authRoutes.post('/login', async (req: Request, res: any) => {
    try {        
        const data = await authService.login(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


authRoutes.post('/refresh-token', async (req: Request, res: any) => {
    try {
        const data = await authService.login(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
