import { Request, Response } from 'express'
import Users from '../models/Users'
import jwt from 'jsonwebtoken'

interface Strategy {
    getMethod(req: Request, res: Response): void
    postMethod(req: Request, res: Response): void
}

export default Strategy