import express from 'express'
import authController from '../controllers/authController'

const AuthRouter = express.Router()
const controller = new authController()

AuthRouter.get('/sign-up', controller.getSignUp)
AuthRouter.post('/sign-up', controller.postSignUp)
AuthRouter.get('/sign-in', controller.getSignIn)
AuthRouter.post('/sign-in', controller.postSignIn)

export default AuthRouter