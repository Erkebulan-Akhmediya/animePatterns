import {Request, Response} from 'express'
import Anime from '../models/Anime'
import Users from '../models/Users'
import mongoose from "mongoose";

class animeController {
    public constructor() {
    }

    public async catalogue(req: Request, res: Response) {
        res.render('catalogue', {anime: await Anime.find({})})
    }

    public async anime(req: Request, res: Response) {
        const animeID: any = req.params.id
        const anime = await Anime.findOne({_id: animeID})

        res.render('anime', {
            anime: anime,
            animeID: animeID,
        })
    }

    public async episode(req: Request, res: Response) {
        const { id: animeID, episodeID } = req.params

        const anime: any = await Anime.findOne(
            {
                _id: animeID,
                "episodes._id": new mongoose.Types.ObjectId(episodeID)
            },
            { "episodes.$": 1 }
        )

        const episode = anime?.episodes?.[0]

        res.render('episode', {
            episode: episode,
            anime: anime,
        })
    }

    public async addPlanning(req: Request, res: Response) {
        const animeID: any = req.params.id

        await Users.findOneAndUpdate({_id: req.body.user.id}, {
            $push: {
                planning: animeID
            }
        })

        res.redirect('/catalogue/' + animeID)
    }

    public async removePlanning(req: Request, res: Response) {
        const animeID: any = req.params.id

        await Users.findOneAndUpdate({_id: req.body.user.id}, {
            $pull: {
                planning: animeID
            }
        })

        res.redirect('/profile')
    }

    public async addLike(req: Request, res: Response) {
        const animeID: any = req.params.id

        await Users.findOneAndUpdate({_id: req.body.user.id}, {
            $push: {
                liked: animeID
            }
        })

        res.redirect('/catalogue/' + animeID)
    }

    public async removelike(req: Request, res: Response) {
        const animeID: any = req.params.id

        await Users.findOneAndUpdate({_id: req.body.user.id}, {
            $pull: {
                liked: animeID
            }
        })

        res.redirect('/profile')
    }
}

export default animeController