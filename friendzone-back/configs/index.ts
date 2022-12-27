// @ts-ignore
import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const SECRET_KEY = process.env.SECRET_KEY;