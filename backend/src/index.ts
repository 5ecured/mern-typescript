import { app } from './app'
import mongoose from 'mongoose'

const port: string | undefined = process.env.PORT

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log('connected to db ✅');
        app.listen(port, () => console.log('server running on port ', port))
    } catch (error) {
        console.log('failed to connect to db');
        console.log(error);
    }
}

startServer()