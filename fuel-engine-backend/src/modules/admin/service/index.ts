import { AppDataSource } from "../../../config/db/config";
import * as jwt from 'jsonwebtoken';
import { CustomError } from "../../../common/customError";

import { validateRequest } from "../../../common/validation";
import { loginSchema } from "../validator/loginSchema.validator";
import { Admin } from "../../../entities/user/admin.entity";

class AdminService {

    async login(req: any, res: any) {
        const validatedData = validateRequest(req.body, loginSchema);
        const adminRepository = AppDataSource.getRepository(Admin);

        const adminExist = await adminRepository.findOne({
            where: {
                email: validatedData.email,
                password: validatedData.password,
            }
        })
        if (!adminExist) {
            throw CustomError("Invalid Credentials", 401)
        }
        const payload = { email: validatedData.email, id: adminExist.id, role: 'admin' };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });


        return { jwt: jwtToken, refreshToken: refreshToken };

    }


    //---------------- Helper Functions -------------------//


}

export const adminService = new AdminService();
