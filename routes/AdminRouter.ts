import express from 'express'
import adminAuth from '../middleware/adminAuth'
import userController from '../controllers/userController'

const AdminRouter = express.Router()

import adminController from '../controllers/adminController'
const controller = new adminController(new userController())

AdminRouter.get('/', adminAuth, controller.admin)
AdminRouter.get('/add', adminAuth, controller.getAddAnime)
AdminRouter.post('/add', adminAuth, controller.postAddAnime)
AdminRouter.get('/update/:id', adminAuth, controller.getUpdateAnime) 
AdminRouter.post('/update/:id', adminAuth, controller.postUpdateAnime)
AdminRouter.post('/update/:id/episodes/add', adminAuth, controller.addEpisode)
AdminRouter.post('/update/:id/:episodeID/delete', adminAuth, controller.deleteEpisode)
AdminRouter.post('/delete/:id', adminAuth, controller.deleteAnime)
AdminRouter.get('/users', adminAuth, controller.users)
AdminRouter.post('/users/delete/:id', adminAuth, controller.deleteUser)
AdminRouter.get('/users/update/:id', adminAuth, controller.getUpdateUser)
AdminRouter.post('/users/update/:id', adminAuth, controller.postUpdateUser)

export default AdminRouter