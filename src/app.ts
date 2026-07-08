import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { routerIndex } from "./router";
import config from "./config";

const app: Application = express();

app.use(cors({
    origin: "*",
    credentials: true
}))

// payment routes

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Rent Nest Back End")
})

app.use("/api", routerIndex)

app.use(notFound)
app.use(globalErrorHandler)
export default app;