import { Request, Response } from 'express'
import Users from '../models/Users'

class userController {
    public constructor() {}

    public async users(req: Request, res: Response) {
        const users = await Users.find()
        res.render('admin/users', { users: users })
    }

    public async deleteUser(req: Request, res: Response) {
        const user = await Users.find()
        const userID: any = req.params.id
    
        await Users.findOneAndDelete({ firstName: user[userID].firstName })
        res.redirect('/admin/users')
    }

    public async getUpdateUser(req: Request, res: Response) {
        const user = await Users.find()
        const userID: any = req.params.id
    
        res.render('admin/updateUsers', { 
            user: user[userID], 
            userID: req.params.id,
        })
    }

    public async postUpdateUser(req: Request, res: Response) {
        const user = await Users.find()
        const userID: any = req.params.id
        
        await Users.findOneAndUpdate({ firstName: user[userID].firstName }, { $set: {
            firstName: req.body.firstName, 
            lastName: req.body.lastName, 
            email: req.body.email, 
        } })
    
        res.redirect('/admin/users')
    }
}

export default userController