import Joi from 'joi'
export function validateRequest(requestData, schema) {
    const { error, value } = schema.validate(requestData);
    if (error) {
        throw new Error(error);
    }
    return value;
}
