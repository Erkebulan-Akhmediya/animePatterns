import { Schema, model } from 'mongoose'
import { animeSchema } from './Anime'

interface IUser {
    firstName: string, 
    lastName: string, 
    email: string,
    password: string,
    planning: string[],
    liked: string[],
}

const schema = new Schema<IUser>({
    firstName: {
        type: String, 
        required: true,
    }, 
    lastName: {
        type: String, 
        required: true,
    }, 
    email: String,
    password: {
        type: String, 
        required: true,
    },
    planning: {
        type: [String], 
        default: [],
    },
    liked: {
        type: [String], 
        default: [],
    }
})

export default model<IUser>('Users', schema)