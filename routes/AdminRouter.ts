import express from 'express'
import Anime from '../models/Anime'
import multer from 'multer'
import userController from '../controllers/userController'

const imageStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        const anime = await Anime.findOne({ _id: req.params.id })
        cb(null, `public/images/`)
    },
    filename: async function(req, res, cb) {
        const anime = await Anime.findOne({ _id: req.params.id })
        cb(null, `${anime?.name}.jpg`)
    }
})

const episodeStorage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const anime = await Anime.findOne({ _id: req.params.id })
        cb(null, `episodes/${anime?.name}`)
    },
    filename: function(req, res, cb) {
        cb(null, `season${req.body.seasonNumber}-episode${req.body.episodeNumber}.mp4`)
    }
})
const uploadEpisode = multer({ storage: episodeStorage })
const uploadImage = multer({ storage: imageStorage })
const AdminRouter = express.Router()

import adminController from '../controllers/adminController'
const controller = new adminController(new userController())

AdminRouter.get('/', controller.admin)
AdminRouter.get('/add', controller.getAddAnime)
AdminRouter.post('/add', controller.postAddAnime)
AdminRouter.get('/update/:id', controller.getUpdateAnime) 
AdminRouter.post('/update/:id', uploadImage.single('image'), controller.postUpdateAnime)
AdminRouter.post('/update/:id/episodes/add', uploadEpisode.single('episode'), controller.addEpisode)
AdminRouter.post('/update/:id/:episodeID/delete', controller.deleteEpisode)
AdminRouter.post('/delete/:id', controller.deleteAnime)
AdminRouter.get('/users', controller.users)
AdminRouter.post('/users/delete/:id', controller.deleteUser)
AdminRouter.get('/users/update/:id', controller.getUpdateUser)
AdminRouter.post('/users/update/:id', controller.postUpdateUser)

export default AdminRouter