require("dotenv").config()

import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v4 as uuidv4 } from 'uuid';
const cloudinary = require('cloudinary').v2;

// routes
import { registerRoutes } from "../routes"
import { deletePostFile } from '../controllers/posts/deletePostImage'

const corsConfig = {
    origin: true,
    credentials: true,
};

const app = express()

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.static('upload'))
app.use(cookieParser())

// middleware
registerRoutes(app)

declare var process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        NODE_ENV: string
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
// app.post('/upload_thumb', upload.single("thumb"), uploadFiels)


app.listen(3000, () => {
    console.log('Server running in port 3000')
})