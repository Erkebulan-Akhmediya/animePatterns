import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import App from './app'
import AdminRouter from './routes/AdminRouter'
import MainRouter from './routes/MainRouter'
import AuthRouter from './routes/AuthRouter'
import AnimeRouter from './routes/AnimeRouter'

dotenv.config()

const app = App.createApp()
const port = process.env.PORT
const connectionUrl: any = process.env.CONNECTION_URL

app.addRouter('/admin', AdminRouter)
app.addRouter('/', MainRouter)
app.addRouter('/', AuthRouter)
app.addRouter('/catalogue', AnimeRouter)

async function start(): Promise<any> {
    try {
        await mongoose.connect(connectionUrl)
        app.listen(port)
    } catch {
        console.log('db connection failed')
    }
}

start()