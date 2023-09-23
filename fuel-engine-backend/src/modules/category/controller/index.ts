import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { categoryService } from '../service';
export const categoryRoutes = Router();


categoryRoutes.post('/generate-otp', async (req: Request, res: any) => {
    try {
        await categoryService.generateOTP(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
categoryRoutes.post('/sign-up', async (req: Request, res: any) => {
    try {        
        const data = await categoryService.verifyOTPAndSignUp(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
categoryRoutes.post('/login', async (req: Request, res: any) => {
    try {        
        const data = await categoryService.loginWithOTP(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


categoryRoutes.get('/refresh-token', async (req: Request, res: any) => {
    try {
        const data = await categoryService.refreshToken(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
