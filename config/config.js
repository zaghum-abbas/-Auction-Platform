import dotenv from "dotenv";
dotenv.config();
export default {
  PORT: process.env.PORT,
  JWT_SECRET_BIDDER: process.env.JWT_SECRET_BIDDER,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_DIALECT: process.env.DB_DIALECT,
};
