
require("dotenv").config()

import express, { Request, Response } from 'express'
import multer from 'multer'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { CloudinaryStorage } from "multer-storage-cloudinary";
const cloudinary = require('cloudinary').v2;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


// routes
import postRoutes from '../routes/posts'
import userRoutes from '../routes/users'
import authRouter from '../routes/auth'

const corsConfig = {
    origin: true,
    credentials: true,
};

const app = express()

app.use(express.json())
app.use(cors(corsConfig))
app.use(express.static('upload'))
app.use(cookieParser())

declare var process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        NODE_ENV: string
    }
}

// middleware
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/', authRouter)

// const storage = multer.diskStorage({
//     destination(req, file, callback) {
//         callback(null, '../client/public/uploads');
//     },
//     filename(req, file, callback) {
//         imageName = uuidv4() + path.extname(file.originalname)
//         callback(null, imageName)
//     },
// })

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'instapp'
    }
})

const upload = multer({ storage: storage})

const uploadFiels = async (req:Request, res:Response) => {
    res.json({ file: req.file?.filename})
}

app.post('/upload_files', upload.single("post"), uploadFiels)
app.post('/upload_thumb', upload.single("thumb"), uploadFiels)








// const main = async () => {
//     const newUser = await prisma.user.create({
//         data: {
//             id: 
//             name: 'isaeedx',
//             email: 'saeedo0o1@hotmail.com',
//             writtenPosts:{
//                 create: {
//                     caption: 'its great day',
//                     images: 'http://image_thumbnail.co',
//                 }
//             },
//             followers: {

//             },
//             following: {

//             }
//         }
//     })

//     const allUsers = await prisma.user.findMany({
//         include: { writtenPosts: true}
//     })

//     const deleteUsers = await prisma.user.delete({
//         where: { id }
//     })

//     console.log('All users: ')
//     console.dir(allUsers, { depth: null })
// }





// main()
//     .catch(e => console.log('Error occured', e))
//     .finally(async () => await prisma.$disconnect());


app.listen(3000, () => {
    console.log('Server running in port 3000')
})