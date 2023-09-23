import { AppDataSource } from "../../../config/db/config";
import * as bycrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { signUpSchema } from "../validator/signUpSchemaValidation";
import { loginSchema } from "../validator";
import { Users } from "../../../entities/user/user.entity";
import { Shopkeeper } from "../../../entities/user/shop.entity";
import { Role } from "../../../entities/user/role.entity";

class AuthService {
    /**
     * Logs in a user with the provided phone number and password.
     *
     * @param {any} req - the request object`
     * @param {any} res - the response object
     * @return {Promise<object>} an object containing the JWT token, user information, and refresh token
     */
    async signUp(req: any, res: any) {
        const validatedData = validateRequest(req.body, signUpSchema);

        const userRepository = AppDataSource.getRepository(Users);
        const roleRepository = AppDataSource.getRepository(Role);
        const shopRepository = AppDataSource.getRepository(Shopkeeper);

        const hashedPassword: string = await new Promise((resolve, reject) => {
            bycrypt.hash(validatedData.password, 10, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        });
        const role = await roleRepository.findOne({
            where: {
                name: 'shopkeeper'
            }
        })
        const userToBeCreated = userRepository.create({
            name: validatedData.name,
            phone: validatedData.phone,
            password: hashedPassword,
            role: { id: role.id }
        })

        const createdUser = await userRepository.save(userToBeCreated);
        const shop = shopRepository.create({
            businessName: validatedData.businessName,
            username: validatedData.username,
            state: validatedData.state,
            address: validatedData.address,
            district: validatedData.district,
            owner: { id: createdUser.id }
        })
        const createdShop = await shopRepository.save(shop);



        const payload = { phone: validatedData.phone, id: createdUser.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        createdUser.refreshToken = refreshToken;
        await userRepository.save(createdUser);

        delete createdUser.password;
        delete createdUser.refreshToken;
        return { jwt: jwtToken, user: createdUser, refreshToken: refreshToken };

    }    
    /**
    * Logs in a user with the provided phone number and password.
    *
    * @param {any} req - the request object
    * @param {any} res - the response object
    * @return {Promise<object>} an object containing the JWT token, user information, and refresh token
    */
    async login(req: any, res: any) {

        const { phone, password } = validateRequest(req.body, loginSchema);
        console.log(phone)
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({ where: { phone: phone } });
        if (!user) {
            throw CustomError("User does not exist", 400)
        }
        const isMatched = await new Promise((resolve, reject) => {
            bycrypt.compare(password, user.password, function (err, data) {
                if (err) reject(err)
                resolve(data)
            });
        })
        if (!isMatched) {
            throw CustomError("Password does not match", 401)
        }
        const payload = { phone: user.phone, id: user.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        return { jwt: jwtToken, user: user, refreshToken: refreshToken };

    }

    async refreshToken(req: any, res: any) {

        const { refreshToken } = req.body
        const decodedToken:any = await jwt.verify(refreshToken, process.env.JWT_SECRET);
        const userRepository = AppDataSource.getRepository(Users);
        const {id:userId} = decodedToken;
        const user = await userRepository.findOne({ where: { id:userId,refreshToken } });
        if (!user) {
            throw CustomError("Invalid Request", 400)
        }
     
        const payload = { phone: user.phone, id: user.id };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        const updatedRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });

        return { jwt: jwtToken, user: user, refreshToken: updatedRefreshToken };

    }
}

export const authService = new AuthService();
