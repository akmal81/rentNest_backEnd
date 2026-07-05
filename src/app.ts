import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors({
    origin:"",
    credentials:true
}))

// payment routes

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req:Request, res:Response)=>{
    res.send("Welcome to Rent Nest Back End")
})


export default app;