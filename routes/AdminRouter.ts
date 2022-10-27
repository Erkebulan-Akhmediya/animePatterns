import express, { Request, Response } from 'express'
import Anime, { episodeModel } from '../models/Anime'
import Users from '../models/Users'
import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const anime = await Anime.findOne({ _id: req.params.id })
        cb(null, `episodes/${anime?.name}`)
    },
    filename: function(req, res, cb) {
        cb(null, `season${req.body.seasonNumber}-episode${req.body.episodeNumber}.mp4`)
    }
})
const upload = multer({ storage: storage })
const AdminRouter = express.Router()

import adminController from '../controllers/adminController'
const controller = new adminController()

AdminRouter.get('/', controller.admin)
AdminRouter.get('/add', controller.getAddAnime)
AdminRouter.post('/add', controller.postAddAnime)
AdminRouter.get('/update/:id', controller.getUpdateAnime) 
AdminRouter.post('/update/:id', controller.postUpdateAnime)
AdminRouter.post('/update/:id/episodes/add', upload.single('episode'), controller.addEpisode)
AdminRouter.post('/update/:id/:episodeID/delete', controller.deleteEpisode)
AdminRouter.post('/delete/:id', controller.deleteAnime)
AdminRouter.get('/users', controller.users)
AdminRouter.post('/users/delete/:id', controller.deleteUser)
AdminRouter.get('/users/update/:id', controller.getUpdateUser)
AdminRouter.post('/users/update/:id', controller.postUpdateUser)

export default AdminRouter