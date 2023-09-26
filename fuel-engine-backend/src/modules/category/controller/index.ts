import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { categoryService } from '../service';
import { adminMiddleware } from '../../../common/middleware/admin.middleware';
export const categoryRoutes = Router();


categoryRoutes.get('/list', async (req: Request, res: any) => {
    try {
        const data = await categoryService.getCategoryList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
categoryRoutes.post('/',adminMiddleware, async (req: Request, res: any) => {
    try {
        await categoryService.createCategory(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
categoryRoutes.put('/:id', adminMiddleware,async (req: Request, res: any) => {
    try {
        const data = await categoryService.updateCategory(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
categoryRoutes.delete('/:id', adminMiddleware,async (req: Request, res: any) => {
    try {
        const data = await categoryService.deleteCategory(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
categoryRoutes.get('/:id', async (req: Request, res: any) => {
    try {
        const data = await categoryService.getCategoryById(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})