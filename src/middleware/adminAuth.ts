import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function adminAuth(req: Request, res: Response, next: NextFunction) {
    const adminToken: string = req.cookies.adminToken
    const secret: any = process.env.ACCESS_TOKEN_SECRET

    if (!adminToken) {   
        res.redirect('/sign-in')
        return;
    }
    
    try {
        console.log(jwt.verify(adminToken, secret))
    } catch {
        res.redirect('/sign-in')
        return
    }
    next()
}

export default adminAuth