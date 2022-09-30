require('dotenv').config()

import { Request,Response } from "express"
import { PrismaClient } from "@prisma/client"
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()


declare const process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        TOKEN_KEY: Secret;
        NODE_ENV: string
    }
}

export const login = async (req:Request , res:Response ) => {
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
            const token = jwt.sign({ userId: existingUser.id, email}, process.env.TOKEN_KEY, { expiresIn: "7d"});
            // save user token
            existingUser.token = token;

            // existingUser
            res
            .cookie('access_token', token, {
                sameSite: 'strict',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .json({ existingUser })
        }

    } catch (error) {
        res.status(404).json({ message: error})
    }
}



export const signUp = async (req:Request, res:Response) => {

    try {
        const { name, email, password, thumbUrl, gender, statusMessage, id } = req.body;

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
            { userId: user.id, email},
            process.env.TOKEN_KEY
        )
        // save user token
        user.token = token;        

        // return new user
        res.status(201).json({ message : user })

    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const logOut = async (req: Request, res: Response) => {
    return res
        .clearCookie('access_token', {sameSite: 'strict'})
        .status(200)
        .json({ message: 'you successfully loged out !! 😢'})
}



export const whoami = (req:Request, res:Response) => {
    try {
        res.status(200).send('work well')
    } catch (error) {
        res.status(404).send(error)
    }
}