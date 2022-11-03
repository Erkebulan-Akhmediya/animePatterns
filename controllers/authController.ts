import { Request, Response } from 'express'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'
import Strategy from './authStrategyInterface'

class authController {
    private static strategy: Strategy
    public constructor(strategy: Strategy) {
        authController.strategy = strategy
    }

    public setStrategy(strategy: Strategy) {
        authController.strategy = strategy
    }

    public getMethod(req: Request, res: Response) {
        authController.strategy.getMethod(req, res)
    } 

    public async postMethod(req: Request, res: Response) {
        authController.strategy.postMethod(req, res)
    }
}

export default authController