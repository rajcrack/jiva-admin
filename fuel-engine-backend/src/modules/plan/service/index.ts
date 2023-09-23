import { AppDataSource } from "../../../config/db/config";
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { signUpSchema } from "../validator/signUpSchemaValidation";
import {  OperationType, generateOTPSchema, verifyOTPSchema } from "../validator";
import { Users } from "../../../entities/user/user.entity";
import { OTP } from "../../../entities/user/otp.entity";
import { MoreThan } from "typeorm";

class PlanService {
    /**
     * Generate OTP for the given request.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<boolean>} - returns true if OTP is generated successfully
     */
    async generateOTP(req: any, res: any) {
        const validatedData = validateRequest(req.body, generateOTPSchema);
        await  this.validateGenerateOTP(validatedData.phone,validatedData.operationType);
        const otpRepository = AppDataSource.getRepository(OTP);
        const otp = this.generateRandomOTP()

        const otpToBeCreated = otpRepository.create({
            otp: otp,
            expiresAt:  new Date(new Date().getTime() + 5 * 60000),
            destination:validatedData.phone
        })

        await otpRepository.save(otpToBeCreated);


        return true;

    }  
    /**
     * Verify the OTP and sign up the user.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} - an object containing the JWT token, user details, and refresh token
     */
    async verifyOTPAndSignUp(req: any, res: any) {
        const validatedData = validateRequest(req.body, signUpSchema);

        const userRepository = AppDataSource.getRepository(Users);
        await this.verifyOTP(validatedData.phone,validatedData.otp)

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
    /**
     * Login with OTP.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} an object containing the JWT token, user information, and refresh token
     */
    async loginWithOTP(req: any, res: any) {

        const { phone, otp } = validateRequest(req.body, verifyOTPSchema);
        console.log(phone)
        const userRepository = AppDataSource.getRepository(Users);

        await this.verifyOTP(phone,otp)

        const user = await userRepository.findOne({ where: { phone: phone } });
        if (!user) {
            throw CustomError("User does not exist", 400)
        }
   
        const payload = { phone: user.phone, id: user.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        delete user.refreshToken;

        return { jwt: jwtToken, user: user, refreshToken: refreshToken };

    }
    /**
     * Refreshes the user's JWT token and updates the refresh token.
     *
     * @param {any} req - the request object
     * @param {any} res - the response object
     * @return {Promise<any>} an object containing the new JWT token, the user object, and the updated refresh token
     */
    async refreshToken(req: any, res: any) {

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
        /**
     * Verifies the provided OTP for the given destination.
     *
     * @param {string} destination - The destination for which the OTP is being verified.
     * @param {number} otp - The OTP to be verified.
     * @return {Promise<boolean>} Returns true if the OTP is valid and has been successfully verified, otherwise false.
     */
    async verifyOTP(destination:string,otp:number){
        const otpRepository = AppDataSource.getRepository(OTP);

        const otpExist =  await otpRepository.findOne({
            where: {
                destination ,
                otp,
                isActive:true,
                expiresAt:MoreThan(new Date())
            }
        })
        if(!otpExist){
         throw CustomError('Invalid OTP OR OTP did not exist',401)
        }
        otpExist.isActive=false;
        await otpRepository.save(otpExist);
        return true;
    }
        /**
     * Validates and generates an OTP for the specified phone number and operation type.
     *
     * @param {string} phone - The phone number to validate and generate OTP for.
     * @param {OperationType} operationType - The type of operation to perform.
     * @return {boolean} Returns true if the validation and OTP generation is successful.
     */
    async validateGenerateOTP(phone:string,operationType:OperationType){

        const otpRepository = AppDataSource.getRepository(OTP);
        const usersRepository = AppDataSource.getRepository(Users);

        const otpExist = await otpRepository.exist({ where: { destination: phone, isActive: true, expiresAt:MoreThan(new Date()) } });
        if(otpExist){
            throw CustomError('You have already requested an OTP',400)
        }
        
        const user = await usersRepository.exist({ where: { phone: phone } });

        if(operationType === OperationType.SIGN_UP && user){
                throw CustomError("You are already registered with us, please login", 400)
        }
        if(operationType === OperationType.LOGIN && !user){
                throw CustomError("You are not registered with us, please register", 400)
        }

        return true;
    }
      /**
      * Generates a random one-time password (OTP).
      *
      * @return {number} The randomly generated OTP.
      */
     generateRandomOTP(): number {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
}

export const planService = new PlanService();
