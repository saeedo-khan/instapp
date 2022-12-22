import { Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from "../../utils/db";
import { generateRandomImage } from "../../utils/generateImage";
import { hashPassword } from "../../utils/password.util";

declare const process : {
    env: {
        CLOUD_NAME: string;
        CLOUD_KEY: string;
        CLOUD_SECRET: string;
        TOKEN_KEY: Secret;
        NODE_ENV: string
    }
}


export const signUp = async (req:Request, res:Response) => {

    try {
        const { name, email, password, gender, biography } = req.body;

        // Validate user input
        if(!(email && password && name)){
            res.status(400).send('All input is required')
        }

        // check if user already exist
        // Validate if user exist in our databases
        const emailExist = await db.user.findUnique({
            where: {
                email
            },
            select: {
                email: true
            }
        })

        if(emailExist){
            return res.status(400).send('User Already Exist. Please Login')
        }


        // Create user
        const user = await db.user.create({
            data:{
                name,
                email,
                password: await Promise.resolve(hashPassword(password)),
                profile_pic_url: generateRandomImage({ str: email }),
                gender,
                biography
            }
        })

        const token = jwt.sign(
            { userId: user.id, email},
            process.env.TOKEN_KEY
        )
        // save user token
        user.token = token;        

        // return new user
        res.status(201).json({
            type: 'success',
            message: `Account created for ${user.name}`,
            data: {
                user,
            },
        });

    } catch (error) {
        return res.status(404).json({ message: error })
    }
}