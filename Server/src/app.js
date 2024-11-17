import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

const corsOptions = {
    origin: CLIENT_URL, 
    credentials : true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended : true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.routes.js"
import formRouter from "./routes/form.routes.js"
import { CLIENT_URL } from '../src/constant.js';

app.use("/api/v1/user", userRouter)
app.use("/api/v1/form", formRouter)



export {app}



