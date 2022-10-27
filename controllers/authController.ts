import { Request, Response } from 'express'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'


class authController {
    public constructor() {}

    public getSignUp(req: Request, res: Response) {
        res.render('auth/sign-up')
    } 

    public async postSignUp(req: Request, res: Response) {
        await Users.create({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password,
        })
        
        res.redirect('/sign-in')
    }

    public getSignIn(req: Request, res: Response) {
        res.render('auth/sign-in')
    }

    public async postSignIn(req: Request, res: Response) {
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

export default authController