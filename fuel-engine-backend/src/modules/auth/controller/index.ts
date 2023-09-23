import { Router } from 'express';
import { authService } from '../service';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
export const authRoutes = Router();


authRoutes.post('/generate-otp', async (req: Request, res: any) => {
    try {
        await authService.generateOTP(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
authRoutes.post('/sign-up', async (req: Request, res: any) => {
    try {        
        const data = await authService.verifyOTPAndSignUp(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
authRoutes.post('/login', async (req: Request, res: any) => {
    try {        
        const data = await authService.loginWithOTP(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


authRoutes.get('/refresh-token', async (req: Request, res: any) => {
    try {
        const data = await authService.refreshToken(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
