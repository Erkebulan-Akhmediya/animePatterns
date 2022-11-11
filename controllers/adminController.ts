import express, { Request, Response } from 'express'
import Anime, { episodeModel } from '../models/Anime'
import fs from 'fs'
import userController from './userController'

const AdminRouter = express.Router()

class adminController {
    private static controller: userController 

    public constructor(controller: userController) {
        adminController.controller = controller
    }

    public async admin(req: Request, res: Response) {
        try {
            const anime = await Anime.find({}, { name: 1, price: 1 })
            res.render('admin/admin', { anime: anime })
        } catch {
            console.log('cannot retrieve records from db')
        }
    }

    public getAddAnime(req: Request, res: Response) {
        res.render('admin/addAnime')
    }

    public async postAddAnime(req: Request, res: Response) {
        try {
            fs.mkdirSync(`./episodes/${req.body.name}`)
            await Anime.create({
                name: req.body.name, 
                description: req.body.description,
            })
            res.redirect('/admin')
        } catch {
            console.log('cannot add anime')
        }
    }

    public async getUpdateAnime(req: Request, res: Response) {
        const animeID: any = req.params.id
        const anime = await Anime.findOne({ _id: animeID })
    
        res.render('admin/updateAnime', { 
            anime: anime, 
            animeID: req.params.id,
        })
    }

    public async postUpdateAnime(req: Request, res: Response) {
        try {
            const animeID: any = req.params.id
            const anime = await Anime.findOne({ _id: animeID })
        
            
            if (anime?.name != req.body.name) {
                fs.renameSync(`./episodes/${anime?.name}`, `./episodes/${req.body.name}`)
            } 
            await Anime.findOneAndUpdate({ _id: animeID }, {
                name: req.body.name, 
                description: req.body.description,
            })

            res.redirect('/admin')
        } catch {
            console.log('cannot update anime')
        }
    }

    public async addEpisode(req: Request, res: Response) {

        await Anime.findOneAndUpdate({ _id: req.params.id }, { $push: {
            episodes: new episodeModel({
                number: req.body.episodeNumber,
                season: req.body.seasonNumber,
            }),
        } })
        res.redirect('/admin/update/' + req.params.id)
    }

    public async deleteEpisode(req: Request, res: Response) {
        await Anime.findOneAndUpdate({ _id: req.params.id }, { $pull: {
            episodes: {
                _id: req.params.episodeID,
            },
        } })
        res.redirect('/admin/update/' + req.params.id)
    }

    public async deleteAnime(req: Request, res:Response) {
        const animeID: any = req.params.id
        const anime = await Anime.findOne({ _id: animeID })
    
        await Anime.findByIdAndRemove({ _id: anime?._id })
        fs.rmSync(`episodes/${anime?.name}`, { recursive: true, force: true })
        res.redirect('/admin')
    }

    public async users(req: Request, res: Response) {
        adminController.controller.users(req, res)
    }

    public async deleteUser(req: Request, res: Response) {
        adminController.controller.deleteUser(req, res)
    }

    public async getUpdateUser(req: Request, res: Response) {
        adminController.controller.getUpdateUser(req, res)
    }

    public async postUpdateUser(req: Request, res: Response) {
        adminController.controller.postUpdateUser(req, res)
    }
}

export default adminController