import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const MY_SECRET_KEY = process.env.MY_SECRET;
export const PORT = process.env.port;

export const db = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.dbport,
});
