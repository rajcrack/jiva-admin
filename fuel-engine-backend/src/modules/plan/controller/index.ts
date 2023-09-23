import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { planService } from '../service';
export const planRoutes = Router();


planRoutes.post('/generate-otp', async (req: Request, res: any) => {
    try {
        await planService.generateOTP(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
planRoutes.post('/sign-up', async (req: Request, res: any) => {
    try {        
        const data = await planService.verifyOTPAndSignUp(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
planRoutes.post('/login', async (req: Request, res: any) => {
    try {        
        const data = await planService.loginWithOTP(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


planRoutes.get('/refresh-token', async (req: Request, res: any) => {
    try {
        const data = await planService.refreshToken(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
