import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";

// Using environment variables
require('dotenv').config();

const connectDB =  new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root@123',
  database: process.env.DB_NAME || 'mitr',
  port: +process.env.DB_PORT || 3306,
  charset: 'utf8',
  synchronize: false,
  //entities: process.env.NODE_ENV !== 'production' ? ['**/**.entity.ts'] : ['dist/**/*.entity.js'],
  entities: [User],
  logging: process.env.NODE_ENV !== 'production' ? 'all' : ['error'],
  migrations: process.env.NODE_ENV !== 'production' ? ['src/migrations/*.ts'] : ['dist/migrations/*.js'],
  connectTimeout: 30000,
  acquireTimeout: 30000
})

connectDB
  .initialize()
    .then(() => {
        console.log(`Data Source has been initialized`);
    })
    .catch((err) => {
        console.error(`Data Source initialization error`, err);
    })

export default connectDB;
