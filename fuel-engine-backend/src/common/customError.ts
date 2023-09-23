export function CustomError(message, statusCode = 500) {
    const error: any = new Error(message);
    error.statusCode = statusCode;
    return error;
}