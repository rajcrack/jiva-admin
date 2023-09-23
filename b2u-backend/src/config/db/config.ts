import { DataSource, DataSourceOptions } from "typeorm";
import { config } from 'dotenv';
import { Users } from "../../entities/user/user.entity";
import { Shopkeeper } from "../../entities/user/shop.entity";
import { Role } from "../../entities/user/role.entity";
import { Order } from "../../entities/order/order.entity";
import { OrderItem } from "../../entities/order/order-items.entity";
import { DeliveryAgents } from "../../entities/user/delivery-agent.entity";
import { Category } from "../../entities/product/catgeory.entity";
import { Product } from "../../entities/product/products.entity";


config();
export const mysqlConfig: DataSourceOptions = {
  "type": "mysql",
  "host": process.env.HOST,
  "port": Number(process.env.DB_PORT),
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_NAME,
  "migrationsTableName": "migrations",
  "entities": [Users, Shopkeeper, Role, Order, OrderItem, DeliveryAgents, Category, Product],
  "migrations": ["dist/config/db/migrations/*.js"], connectTimeout: 20000
}

export const AppDataSource = new DataSource(mysqlConfig)