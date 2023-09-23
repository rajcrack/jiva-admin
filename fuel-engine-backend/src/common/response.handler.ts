export const successResponseHandler = (res: any, data: any = null, status = 200) => {
    res.status(status).json({
        success: true,
        data: data ,
        error:null
    });
};
export const errorResponseHandler = (res: any, error: any, status = 500) => {
    console.log(error)
    res.status(status).json({
        success: false,
        data:null,
        error: error.message || 'Internal Server Error',
    });
};