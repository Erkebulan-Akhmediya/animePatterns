import { Request, Response } from 'express'

interface Strategy {
    getMethod(req: Request, res: Response): void
    postMethod(req: Request, res: Response): void
}

export default Strategy