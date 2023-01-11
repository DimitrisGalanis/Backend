import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.port;

export const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
