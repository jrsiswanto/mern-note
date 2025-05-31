import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";
import rateLimiter from "../middleware/rateLimiter.js";
import cors from "cors"

dotenv.config();

const app =express();

connectDB().then(()=>{
    app.listen(5001, ()=>{
    console.log("server anda running di port:5001");
})
});

//middleware
app.use(cors({
    origin:"http://localhost:5173", 
}))
app.use(express.json());
app.use(rateLimiter)


app.use("/api/notes", notesRoutes);



