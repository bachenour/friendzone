import * as jwt from 'jsonwebtoken';
import * as Fs from "fs";

interface Keys {
    private: string;
    public: string;
}
export class JwtService {
    public secret: string;
    
    constructor() {
        this.secret = process.env.TOKEN_KEY || 'secret';
    }
    
    sign(payload: any): string {
        const keys = JwtService.getPublicAndPrivateKeys();
        return jwt.sign(payload, {key: keys.private, passphrase: process.env.PRIVATE_KEY_PASSPHRASE}, {expiresIn: '3h', algorithm: 'RS256'});
    }
    
    verify(req, res, next): void {
        const token = req.headers['x-access-token'];
        const keys = JwtService.getPublicAndPrivateKeys();
        if (!token) {
            return res.status(403).send({auth: false, message: 'No token provided.'});
        }
        jwt.verify(token, keys.public , {algorithms: ['RS256']} ,(err, decoded) => {
            if (err) {
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
            }
            
            req.body.userPayload = decoded;
           
            next();
        });
    }
    
   
    static getPublicAndPrivateKeys(): Keys {
        const privateKey = Fs.readFileSync('./configs/back.private-key.pem', 'utf8');
        const publicKey = Fs.readFileSync('./configs/back.public-key.pem', 'utf8');
        return { private : privateKey, public : publicKey};
    }
}