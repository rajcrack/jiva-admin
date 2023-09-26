import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { Users } from "../../entities/user/user.entity";
import { Category } from "../../entities/product/catgeory.entity";
import { Product } from "../../entities/product/products.entity";
import { OTP } from "../../entities/user/otp.entity";
import { Brand } from "../../entities/product/brand.entity";
import { Plan } from "../../entities/plan/plan.entity";
import { PlanMembership } from "../../entities/plan/plan-membership.entity";
import { Admin } from "../../entities/user/admin.entity";


config();
export const mysqlConfig: DataSourceOptions = {
  "type": "mysql",
  "host": process.env.HOST,
  "port": Number(process.env.DB_PORT),
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "migrationsTableName": "migrations",
  "entities": [Users, OTP,Admin,Brand,Product,Category,Plan,PlanMembership],
  "migrations": ["dist/config/db/migrations/*.js"], connectTimeout: 20000
}

export const AppDataSource = new DataSource(mysqlConfig)