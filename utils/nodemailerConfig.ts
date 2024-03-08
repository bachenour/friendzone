import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();


const transporter = nodemailer.createTransport({
    //sendinblue
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: process.env.SENDINBLUE_USER,
        pass: process.env.SENDINBLUE_PASS
    }
});

export default transporter;