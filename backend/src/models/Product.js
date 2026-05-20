import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ["luxury", "sport", "casual", "smart"],
         default: "luxury",
    },
    
},
    {timestamps: true})


export default mongoose.model("Product", productSchema)