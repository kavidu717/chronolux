import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'




const app = express()


app.use(cors())
app.use(express.json())
dotenv.config()


connectDB()

app.get('/', (req, res) => {
    res.send('backend running kaviduheloo with docker hello neda kavidu')
})


app.listen(5000, () => {
    console.log('Server is runningoi onyu port 5000 ')
})