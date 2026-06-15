import { GoogleGenerativeAI } from "@google/generative-ai";

import Product from "../models/Product.js";




export const getChatbotResponse = async (req, res) => {
  try {

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

   
    const products = await Product.find().select("name price brand description status -_id");
    const inventoryData = JSON.stringify(products);

   
    const prompt = `
      You are an expert customer support assistant for a premium watch store named "Luxe Watches".
      Be polite, professional, and helpful. Answer in short paragraphs.
      Here is the current database of our watches in JSON format: ${inventoryData}
      
      User Question: "${userMessage}"
      
      Instructions:
      - Answer the user's question based ONLY on the database information provided above.
      - If they ask about the price, mention the price clearly.
      - If they ask for a watch we don't have, politely tell them it's currently unavailable.
      - Keep your answers concise, natural, and formatted nicely. Do not show the raw JSON data to the user.
    `;

   
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    const botReply = result.response.text();

  
    res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ reply: "I'm sorry, I'm having trouble connecting to my database right now. Please try again later." });
  }
};