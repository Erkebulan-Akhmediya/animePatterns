import express, { Request, Response } from 'express'
import Users from '../models/Users'
import auth from '../middleware/auth'
import Anime from '../models/Anime'
import {Types} from 'mongoose'

const MainRouter = express.Router()

MainRouter.get('/profile', auth, async (req: Request, res: Response) => {
    const user = await Users.findById(req.body.user.id, { planning: 1, liked: 1 })

    if (user === null) {
        res.status(500).send('User not found')
        return
    }

    const planningObjectIds = user.planning.map(id => new Types.ObjectId(id))
    const planning = await Anime.find({ _id: { $in: planningObjectIds } })

    const likedObjectIds = user.liked.map(id => new Types.ObjectId(id))
    const liked = await Anime.find({ _id: { $in: likedObjectIds } })

    res.render('profile', { 
        user: req.body.user, 
        planning: planning,
        liked: liked,
    })
})

MainRouter.get('/', (req: Request, res: Response) => {
    res.redirect('/catalogue')
})

MainRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('token')
    res.redirect('/sign-in')
})

export default MainRouter