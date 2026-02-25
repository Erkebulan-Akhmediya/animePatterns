import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function auth(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token
    const secret: any = process.env.ACCESS_TOKEN_SECRET

    if (!token) {   
        res.redirect('/sign-in')
        return;
    }
    
    try {
        jwt.verify(token, secret, (err: any, decodedToken: any) => {
            const userData = decodedToken.split(' ')
            const user = {
                id: userData[4].slice(10, userData[4].length-4),
                firstName: userData[7].slice(1, userData[7].length-3),
                lastName: userData[10].slice(1, userData[10].length-3),
                decodedToken: decodedToken,
            }
    
            req.body.user = user
        })
    } catch {
        res.redirect('/sign-in')
        return
    }
    next()
}

export default auth