import { Request, Response } from 'express'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import Strategy from './authStrategyInterface'

class signInController implements Strategy {
    public getMethod(req: Request, res: Response) {
        res.render('auth/sign-in')
    }

    public async postMethod(req: Request, res: Response) {
        try {
            const foundUser = await Users.find({ 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                password: req.body.password,
            })
            const secret: any = process.env.ACCESS_TOKEN_SECRET
            const token = jwt.sign(foundUser.toString(), secret)
    
            res.clearCookie('token')
            res.cookie('token', token, { maxAge: 15 * 60 * 1000 })
    
            res.redirect('/profile')
        } catch(e) {
            res.send('Incorrect User Data')
        }
    }
}

export default signInController