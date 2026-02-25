import express, { Request, Response } from 'express'
import Users from '../models/Users'
import auth from '../middleware/auth'
import fs from 'fs'
import Anime from '../models/Anime'

const MainRouter = express.Router()

MainRouter.get('/profile', auth, async(req: Request, res: Response) => {
    const cart = await Users.find({ _id: req.body.user.id }, { planning: 1, liked: 1 })
    console.log(cart)

    const planning = []
    for (let i = 0; i < cart[0].planning.length; i++) {
        let temp = await Anime.findOne({ _id: cart[0].planning[i] })
        planning.push(temp)
    }

    const liked = []
    for (let i = 0; i < cart[0].liked.length; i++) {
        let temp = await Anime.findOne({ _id: cart[0].liked[i] })
        liked.push(temp)
    }

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