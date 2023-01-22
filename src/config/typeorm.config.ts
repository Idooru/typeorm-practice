import { DataSource } from "typeorm";
import { config } from "dotenv";
import { UserEntity } from "../models/UserEntity";
import { ChatEntity } from "../models/ChatEntity";
config();

export const typeOrmConfig = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [UserEntity, ChatEntity],
  migrations: [],
  subscribers: [],
});
