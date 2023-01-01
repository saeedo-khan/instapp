import { Request,Response } from "express"
import jwt, { Secret } from 'jsonwebtoken'
import { db } from "../../utils/db"
import bcrypt from 'bcryptjs'

// @ts-nocheck

declare const process : {
    env: {
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

        const existingUser = await db.user.findUnique({
            where: {email},
            select: {
                id: true,
                password: true,
                token: true,
                name: true,
                email: true,
            }
        });

        if(!existingUser){
            res.status(403);
            throw new Error('Invalid login credentials.')
        }

        const isMatch =  await bcrypt.compare(password, existingUser.password)

        if(existingUser && isMatch) {
            
            // Create token
            const token = jwt.sign({ userId: existingUser.id, email}, process.env.TOKEN_KEY, { expiresIn: "12h"});
            // save user token
            existingUser.token = token;

            // existingUser
            res
            .cookie('accessToken', token, {
                sameSite: 'strict',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 3600 * 12
            })
            
            return res.status(200).json({
                type: "success",
                message: "login successful",
                data : {
                    existingUser,
                },
            });
        }

    } catch (error) {
        res.status(404).json({ message: error})
    }
}