import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const cloudinary = require('cloudinary').v2;


export const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany({
            include: { writtenPosts: true, followers: true, following: true, likesPost: true }
        })
        res.json(users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findFirst({
            where: {name: id},
            include: { writtenPosts: true, followers: true, following: true, likesPost: true }
        })
        res.json(user)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const createUser = async (req:Request, res:Response) => {
    try {
        let { name, email, thumbUrl, gender, statusMessage, password  } = req.body
        const result = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password,
                thumbUrl,
                gender,
                statusMessage
            }
        })

        res.json(result)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const updateUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params
        const { name, email, thumbUrl, gender, statusMessage } = req.body

        const updateUser = await prisma.user.update({
            where: { id: id},
            data: {
                name: name,
                email: email,
                thumbUrl,
                gender,
                statusMessage
            }
        })
        res.json(updateUser)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const delateUser = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.delete({
            where: { id: id}            
        })
        res.json(user)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}



// followe a user

export const addFollower = async (req:Request, res:Response) => {
    const { userId, followerId, isFollower } = req.body;
    console.log(req.body)
    try {
        const followUser = await prisma.follower.create({
            data: {
                userId,
                followerId,
                isFollower
            }
        })
    
        res.status(200).json(followUser)
    } catch (error) {
        res.status(404).json({ error: error })
    }
        
    
}


export const deleteFollower = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const removeFollow = await prisma.follower.delete({
            where: {id: Number(id)},
        })
        res.json(removeFollow)
    } catch (error) {
        res.status(404).json({ message: error})
    }
}


// update thumb 

export const deleteThumb = async (req:Request, res:Response) => {
    const { id } = req.params
    const { thumbUrl } = req.body;
    try {
        await prisma.user.update({
            where: { id: id},
            data: { thumbUrl }
        });
        cloudinary.uploader.destroy(thumbUrl)
        
        res.status(200).send(thumbUrl)
    } catch (error) {
        res.status(400).json({ error: error })
    }
}

