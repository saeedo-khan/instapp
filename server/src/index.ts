
require("dotenv").config()

import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from 'express'
import multer from 'multer'
import cors from 'cors'
import path from "path";
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import postRoutes from '../routes/posts'
import userRoutes from '../routes/users'
import verifyToken from "../middleware/auth";
const cloudinary = require('cloudinary').v2;


const prisma = new PrismaClient()

const app = express()


app.use(express.json())
app.use(cors())
app.use(express.static('upload'))

declare var process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        TOKEN_KEY: Secret;
        NODE_ENV: string
    }
  }

// middleware
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

let imageName = ''

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
    console.log(req.file);
    res.json({ file: req.file?.filename})
}


app.post('/upload_files', upload.single('post'), uploadFiels)



// auth Registration
app.post('/signup', async (req:Request, res:Response) => {

    try {
        const { name, email, password, thumbUrl, gender, statusMessage } = req.body;

        // Validate user input
        if(!(email && password && name)){
            res.status(400).send('All input is required')
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await prisma.user.findFirst({
            where: {email}
        })

        if(oldUser){
            return res.status(409).send('User Already Exist. Please Login')
        }

        // Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: encryptedPassword,
                thumbUrl,
                gender,
                statusMessage
            }
        })

        const token = jwt.sign(
            user,
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user)

    } catch (error) {
        res.status(404).json({ message: error })
    }
})


// auth login

app.post('/login', async (req:Request , res:Response ) => {
    try {
        const { email, password } = req.body
        
        if(!(email && password)){
            res.status(400).send('All inputs are required')
        }

        const existingUser = await prisma.user.findUnique({
            where: {email}
        })

        if(!existingUser){
            res.status(403);
            throw new Error('Invalid login credentials.')
        }

        const isMatch =  await bcrypt.compare(password, existingUser.password)

        if(existingUser && isMatch) {
            
            // Create token
            const token = jwt.sign(existingUser, process.env.TOKEN_KEY, { expiresIn: "2h"});
            res.json({ token: token})
            // save user token
            existingUser.token = token;

            // existingUser
            res.status(200).json({ existingUser })
        }

    } catch (error) {
        res.status(404).json({ message: error})
    }
})





const main = async () => {
    const newUser = await prisma.user.create({
        data: {
            name: 'isaeedx',
            email: 'saeedo0o1@hotmail.com',
            writtenPosts:{
                create: {
                    caption: 'its great day',
                    images: 'http://image_thumbnail.co',
                }
            }
        }
    })
    console.log('Created new user', newUser)

    const allUsers = await prisma.user.findMany({
        include: { writtenPosts: true}
    })

    console.log('All users: ')
    console.dir(allUsers, { depth: null })
}





main()
    .catch(e => console.log('Error occured', e))
    .finally(async () => await prisma.$disconnect());


app.listen(3000, () => {
    console.log('Server running in port 3000')
})