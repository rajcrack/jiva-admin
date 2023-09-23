import { CustomError } from "./customError";
import { errorResponseHandler } from "./response.handler";

const jwt = require('jsonwebtoken');

// Authentication middleware
export const authMiddleware = async (req, res, next) => {

    try {   // Get the token from the request headers
        const authHeader = req.headers.authorization;
        console.log("header", authHeader)
        // Check if token exists
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw CustomError('Invalid token', 401);
        }


        // Extract the token from the Authorization header
        const token = authHeader.split(' ')[1];
        // Verify the token and decode the payload
        console.log(token)
        console.log(process.env.JWT_SECRET)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded payload to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        errorResponseHandler(res, error, error.statusCode);
    }
};

