import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import gameRoute from './routes/gameRoute'

const app: Application = express()

app.use(express.json())

app.use('/api/games', gameRoute)



export { app }