import express, { Request, Response } from 'express'
import Users from '../models/Users'
import auth from '../middleware/auth'
import fs from 'fs'
import Anime from '../models/Anime'

const MainRouter = express.Router()

MainRouter.get('/profile', auth, async(req: Request, res: Response) => {
    const cart = await Users.find({ _id: req.body.user.id }, { planning: 1, liked: 1 })
    
    res.render('profile', { 
        user: req.body.user, 
        planning: cart[0].planning,
        liked: cart[0].liked,
    })
})

MainRouter.get('/', (req: Request, res: Response) => {
    res.render('welcome')
})

MainRouter.get('/video/:animeID/:episodeID', async(req: Request, res: Response) => {
    const range: any = req.headers.range
    if (!range) {
        res.status(400).send("Requires Range header")
    }

    const animeID: any = req.params.animeID
    let anime: any = await Anime.findOne({ _id: animeID })

    const episodeID: any = req.params.episodeID
    let episode = null

    for (let i = 0; i < anime?.episodes.length; i++) {
        if (anime.episodes[i]._id == episodeID) {
            episode = anime.episodes[i]
        }
    }

    const videoPath = 'episodes/' + anime.name + '/season' + episode.season + '-episode' + episode.number + '.mp4'
    
    try {
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        }
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    } catch {
        res.send('file not found')
    }
})

export default MainRouter