import transporter from "../utils/nodemailerConfig";
import * as fs from "fs";
import * as bcrypt from "bcrypt";

class MailerService{
    static async sendVerifyEmail(to: string, subject: string): Promise<any> {
        const filePath = process.cwd()+'/public/templates/validate_email/index.html';
        const file = fs.readFileSync(filePath, 'utf8').toString();
        
        //hash email
        const hashEmail = await bcrypt.hash(to, 10);

        
        //replace string
        const html = file.replace(/{{insertUrlLink}}/g, 'http://localhost:3000/verify/?token=' + hashEmail+'&email='+to);
        
        return transporter.sendMail({
            from: "Team FriendZone <service@friendzone>",
            to,
            subject,
            html :  html
        });
    }
    
    static async sendWelcomeEmail(to: string, subject: string): Promise<any> {
        const filePath = process.cwd()+'/public/templates/email_validated/index.html';
        const file = fs.readFileSync(filePath, 'utf8').toString();

        //hash email
        const hashEmail = await bcrypt.hash(to, 10);

        //replace string
        const html = file.replace(/{{insertUrlLink}}/g, 'http://localhost:3000/verify/?token=' + hashEmail+'email='+to);

        return transporter.sendMail({
            from: "Team FriendZone <service@friendzone>",
            to,
            subject,
            html :  html
        });
    }
}

export default MailerService;