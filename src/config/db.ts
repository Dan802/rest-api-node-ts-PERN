import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import pg from 'pg';

dotenv.config({ quiet: true });

// process.env.DATABASE_URL! We are 100% the variable wont be undefined 
const db = new Sequelize(process.env.DATABASE_URL!, {
  // dialectOptions: {
  //   ssl: {
  //     requiere: false
  //   }
  // },
  // __dirname: /src/config/db.ts
  dialect: 'postgres',
  dialectModule: pg,
  models: [__dirname + "/../models/**/*"],
  logging: false, // console logs
});

export default db;