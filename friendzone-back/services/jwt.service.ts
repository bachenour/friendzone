import * as jwt from 'jsonwebtoken';
export class JwtService {
    public secret: string;
    
    constructor() {
        this.secret = process.env.TOKEN_KEY || 'secret';
    }
    
    sign(payload: any): string {
        return jwt.sign(payload, this.secret);
    }
    
    verify(req, res, next): void {
        const token = req.headers['x-access-token'];
        const secret = process.env.TOKEN_KEY || 'secret';
        if (!token) {
            return res.status(403).send({auth: false, message: 'No token provided.'});
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
            }
            req.userId = decoded.id;
            next();
        });
    }
}