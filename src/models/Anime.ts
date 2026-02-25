import { Schema, model } from 'mongoose'

interface IAnime {
    name: string, 
    description: string,
    episodes: IEpisode[],
    imageUrl: string,
}

interface IEpisode {
    number: number,
    season: number,
    url: string,
}

export const episodeSchema = new Schema<IEpisode>({
    number: Number,
    season: {
        type: Number, 
        default: 1,
    },
    url: String,
})

export const episodeModel = model<IEpisode>('Episode', episodeSchema)

export const animeSchema = new Schema<IAnime>({
    name: {
        type: String, 
        required: true,
    }, 
    description: String,
    episodes: {
        type: [episodeSchema], 
        default: [],
    },
    imageUrl: String,
})

export default model<IAnime>('Anime', animeSchema)