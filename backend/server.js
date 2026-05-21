import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'




const app = express()


app.use(cors())
app.use(express.json())
dotenv.config()


connectDB()

app.get('/', (req, res) => {
    res.send('backend running kaviduheloo with docker hello neda kavidu')
})

app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes);
app.use("/api/cart", cartRoutes);

 app.use("/api/order", orderRoutes);

console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);


app.listen(5000, () => {
    console.log('Server is runningoi onyu port 5000 ')
})