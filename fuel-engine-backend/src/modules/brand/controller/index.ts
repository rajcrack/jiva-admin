import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { brandService } from '../service';
import { adminMiddleware } from '../../../common/middleware/admin.middleware';
export const brandRoutes = Router();


brandRoutes.get('/list', async (req: Request, res: any) => {
    try {
        const data = await brandService.getBrandList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})

brandRoutes.post('/',adminMiddleware, async (req: Request, res: any) => {
    try {
        await brandService.createBrand(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
brandRoutes.put('/:id',adminMiddleware, async (req: Request, res: any) => {
    try {
        const data = await brandService.updateBrand(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
brandRoutes.delete('/:id', adminMiddleware,async (req: Request, res: any) => {
    try {
        const data = await brandService.deleteBrand(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


brandRoutes.get('/:id', async (req: Request, res: any) => {
    try {
        const data = await brandService.getBrandById(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
