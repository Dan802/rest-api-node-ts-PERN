import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

// process.env.DATABASE_URL! We are 100% the variable wont be undefined 
const db = new Sequelize(process.env.DATABASE_URL!, {
  // dialectOptions: {
  //   ssl: {
  //     requiere: false
  //   }
  // },
  // __dirname: /src/config/db.ts
  models: [__dirname + "/../models/**/*.ts"]
});

export default db;