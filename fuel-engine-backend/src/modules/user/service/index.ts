import { AppDataSource } from "../../../config/db/config";
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { Users } from "../../../entities/user/user.entity";

class UserService {

    async profile(req: any, res: any) {
        const {id:userId} =req.user;
        const userRepository = AppDataSource.getRepository(Users);

        const user = await userRepository.findOne({
            where: {
                id:userId,
            }
        })
        if (!user) {
            throw CustomError("User Does Not exist", 401)
        }
delete user.refreshToken;

        return user;

    }


    //---------------- Helper Functions -------------------//


}

export const userService = new UserService();
