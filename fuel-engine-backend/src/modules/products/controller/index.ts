import { Router } from 'express';
import { errorResponseHandler, successResponseHandler } from '../../../common/response.handler';
import { productService } from '../service';
import { adminMiddleware } from '../../../common/middleware/admin.middleware';
export const productRoutes = Router();


productRoutes.post('/',adminMiddleware ,async (req: Request, res: any) => {
    try {
        await productService.createProduct(req, res);
        successResponseHandler(res)
    } catch (error) {
        errorResponseHandler(res, error)
    }
})
productRoutes.put('/:id', adminMiddleware,async (req: Request, res: any) => {
    try {        
        const data = await productService.updateProduct(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
productRoutes.delete('/',adminMiddleware, async (req: Request, res: any) => {
    try {        
        const data = await productService.deleteProduct(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})


productRoutes.get('/:id',adminMiddleware, async (req: Request, res: any) => {
    try {
        const data = await productService.getProductById(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
productRoutes.get('/list', adminMiddleware,async (req: Request, res: any) => {
    try {
        const data = await productService.getProductList(req, res);
        successResponseHandler(res, data)

    } catch (error) {
        errorResponseHandler(res, error)

    }
})
