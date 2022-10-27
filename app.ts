import cookieParser from 'cookie-parser'
import express from 'express'

class App {
    private app: express.Application
    private instance: App

    private constructor() {
        this.app = express()

        this.app.set('views', './views')
        this.app.set('view engine', 'pug')
        this.app.use(express.static('public'))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
    }

    public static createApp() {
        if (this.instance == null) {
            this.instance = new App()
        }
        return this.instance
    }

    public addRouter(path: string, router: express.Router): void {
        this.app.use(path, router)
    }

    public listen(port: any): void {
        this.app.listen(port)
    }
}

export default App