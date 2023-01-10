// @ts-nocheck
require("dotenv").config()
import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require('cloudinary').v2;
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
// routes
import { deletePostFile } from './controllers/posts/deletePostImage'
import authRoutes from './routes/auth.route';
import commentRoutes from './routes/comment.route';
import postRoutes from './routes/post.route';
import userRoutes from './routes/user.route';
import searchRoutes from './routes/search.route';


const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true })) //
app.use(express.static('upload'))
app.use(cookieParser())

// all routes

app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);

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

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server listening on ${port}`)
})