import { Schema, model } from 'mongoose'

interface IAnime {
    name: string, 
    description: string,
    episodes: IEpisode[],
}

interface IEpisode {
    low: string,
    medium: string, 
    high: string,
    number: number,
    season: number,
}

export const episodeSchema = new Schema<IEpisode>({
    number: Number,
    season: {
        type: Number, 
        default: 1,
    }
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
    }
})

export default model<IAnime>('Anime', animeSchema)