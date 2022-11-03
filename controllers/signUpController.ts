import { Request, Response } from 'express'
import Users from '../models/Users'
import Strategy from './authStrategyInterface'

class signUpController implements Strategy {
    public getMethod(req: Request, res: Response): void {
        res.render('auth/sign-up')
    }

    public async postMethod(req: Request, res: Response) {
        await Users.create({
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
            password: req.body.password,
        })
        
        res.redirect('/sign-in')
    }
}

export default signUpController