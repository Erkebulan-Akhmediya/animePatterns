import express, { Request, Response } from 'express'
import auth from '../middleware/auth'
import animeController from '../controllers/animeController'

const AnimeRouter = express.Router()
const controller = new animeController()

AnimeRouter.get('/', controller.catalogue)
AnimeRouter.get('/:id', controller.anime)
AnimeRouter.get('/:id/:episodeID', controller.episode)
AnimeRouter.post('/:id/planning', auth, controller.addPlanning)
AnimeRouter.post('/:id/planning/remove', auth, controller.removePlanning)
AnimeRouter.post('/:id/like', auth, controller.addLike)
AnimeRouter.post('/:id/like/remove', auth, controller.removelike)

export default AnimeRouter