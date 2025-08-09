import * as dotenv from "dotenv";
import mysql from "mysql2/promise";


dotenv.config()

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } = process.env

export const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})