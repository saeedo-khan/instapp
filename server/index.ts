require("dotenv").config()

import express, { Request, Response } from 'express'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require('cloudinary').v2;

// routes
import { registerRoutes } from "./routes"
import { deletePostFile } from './controllers/posts/deletePostImage'
import { createUsers } from './controllers/automation/user.automation'

const corsConfig = {
    origin: true,
    credentials: true,
};

const app = express()

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.static('upload'))
app.use(cookieParser())

// all routes
registerRoutes(app)

declare var process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        NODE_ENV: string;
        PORT: string;
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'instapp',
        public_id: (req:any, file:any) => Math.random()
    },
})



const multerUplaod = multer({ storage })




const uploadFiels = async (req:Request, res:Response) => {
    res.json(req.file)
}


app.post('/upload_files', multerUplaod.single("post"), uploadFiels)
app.delete("/api/:imageId", deletePostFile)

app.get("/", async (req:Request, res:Response) => {
    res.send("app running...")
})

createUsers(10)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})