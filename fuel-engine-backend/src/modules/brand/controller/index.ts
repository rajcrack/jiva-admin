import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { brandService } from '../service';
export const brandRoutes = Router();


brandRoutes.post('/generate-otp', async (req: Request, res: any) => {
    try {
        await brandService.generateOTP(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
brandRoutes.post('/sign-up', async (req: Request, res: any) => {
    try {        
        const data = await brandService.verifyOTPAndSignUp(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
brandRoutes.post('/login', async (req: Request, res: any) => {
    try {        
        const data = await brandService.loginWithOTP(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


brandRoutes.get('/refresh-token', async (req: Request, res: any) => {
    try {
        const data = await brandService.refreshToken(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
