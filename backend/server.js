import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/authRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'
import paymentRoutes from './src/routes/paymentRoutes.js'
import invoiceRoutes from './src/routes/invoiceRoutes.js'




const app = express()

dotenv.config()


app.use(cors())
app.use(express.json())


connectDB()



app.use("/api/auth",authRoutes)
app.use("/api/products",productRoutes);
app.use("/api/cart", cartRoutes);

 app.use("/api/order", orderRoutes);



app.use("/api/payment", paymentRoutes);
app.use("/api/invoice", invoiceRoutes);


app.listen(5000, () => {
    console.log('Server is runningoi onyu port 5000 ')
})
