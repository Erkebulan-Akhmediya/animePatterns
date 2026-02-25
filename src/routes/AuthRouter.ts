import express, { Request, Response, NextFunction } from 'express'
import authController from '../controllers/authController'
import signInController from '../controllers/signInController'
import signUpController from '../controllers/signUpController'

const AuthRouter = express.Router()

const controller = new authController(new signUpController())

AuthRouter.get('/sign-up', function(req: Request, res: Response, next: NextFunction) {
    controller.setStrategy(new signUpController())
    next()
}, controller.getMethod)

AuthRouter.post('/sign-up', function(req: Request, res: Response, next: NextFunction) {
    controller.setStrategy(new signUpController())
    next()
}, controller.postMethod)

AuthRouter.get('/sign-in', function(req: Request, res: Response, next: NextFunction) {
    controller.setStrategy(new signInController())
    next()
}, controller.getMethod)

AuthRouter.post('/sign-in', function(req: Request, res: Response, next: NextFunction) {
    controller.setStrategy(new signInController())
    next()
}, controller.postMethod)

export default AuthRouter