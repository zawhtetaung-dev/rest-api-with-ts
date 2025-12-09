import express, { json } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import router from "./routes/todo";
import cors from "cors";

const app = express();

dotenv.config({
    path:".env",
})

app.use(cors({
     origin : "http://localhost:5173", //process.env.CLIENT_URL,
    
}))
app.use(json());
app.use(router)

const PORT = process.env.PORT || "4000";
app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on PORT :" + PORT)
})