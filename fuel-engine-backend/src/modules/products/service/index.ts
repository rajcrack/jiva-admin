import { AppDataSource } from "../../../config/db/config";
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { Users } from "../../../entities/user/user.entity";
import { OTP } from "../../../entities/user/otp.entity";
import { MoreThan } from "typeorm";
import { createProductSchema } from "../validator";

class ProductService {
    
    async createProduct(req: any, res: any) {
        const validatedData = validateRequest(req.body, createProductSchema);
        const otpRepository = AppDataSource.getRepository(OTP);

        const otpToBeCreated = otpRepository.create({
            otp: 12,
            expiresAt:  new Date(new Date().getTime() + 5 * 60000),
            destination:validatedData.phone
        })

        await otpRepository.save(otpToBeCreated);


        return true;

    }  
  
    async updateProduct(req: any, res: any) {
        const validatedData = validateRequest(req.body, createProductSchema);

        const userRepository = AppDataSource.getRepository(Users);

        const userToBeCreated = userRepository.create({
            name: validatedData.name,
            phone: validatedData.phone,
            email:validatedData.email
        })

        const createdUser = await userRepository.save(userToBeCreated);



        const payload = { phone: validatedData.phone, id: createdUser.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        createdUser.refreshToken = refreshToken;
        await userRepository.save(createdUser);

        delete createdUser.refreshToken;
        return { jwt: jwtToken, user: createdUser, refreshToken: refreshToken };

    }    

    async getProductById(req: any, res: any) {


    }    async getProductList(req: any, res: any) {

        const userRepository = AppDataSource.getRepository(Users);



    }
  
    async deleteProduct(req: any, res: any) {

        const { refreshToken } = req.body
        const decodedToken:any = await jwt.verify(refreshToken, process.env.JWT_SECRET);
        const userRepository = AppDataSource.getRepository(Users);
        const {id:userId} = decodedToken;
        const user = await userRepository.findOne({ where: { id:userId,refreshToken } });
        if (!user) {
            throw CustomError("User does not exist", 404)
        }
     
        const payload = { phone: user.phone, id: user.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        const updatedRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        user.refreshToken = updatedRefreshToken;
        await userRepository.save(user)
        
        delete user.refreshToken;
        return { jwt: jwtToken, user: user, refreshToken: updatedRefreshToken };

    }

    //---------------- Helper Functions -------------------//

}

export const productService = new ProductService();
