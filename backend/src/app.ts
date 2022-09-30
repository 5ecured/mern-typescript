import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import gameRoute from './routes/gameRoute'

const app: Application = express()

app.use(express.json())


// app.get('/', (req: Request, res: Response) => {
//     res.send({ message: 'waku' })
// })

app.use('/api/games', gameRoute)



export { app }