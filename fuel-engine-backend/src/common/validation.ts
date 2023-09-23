import Joi from 'joi'
import { CustomError } from './customError';
export function validateRequest(requestData, schema) {
    const { error, value } = schema.validate(requestData);
    if (error) {
        throw CustomError(error,400);
    }
    return value;
}
