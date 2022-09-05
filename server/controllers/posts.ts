import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const getPosts = async (req:Request, res:Response) => {
    try {
        const data = await prisma.post.findMany({
            include: { PostTag: true, comments: true}
        })
        res.json(data)

    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getPost = async (req:Request, res:Response) => {
    const { id } = req.params;
    const post = await prisma.post.findFirst({
        where: { id: id },
        include: {author: true}
    })
    res.json(post)
}


export const createPost = async (req:Request, res:Response) => {
    try {
        const { caption, images, authorEmail } = req.body;
        const post = await prisma.post.create({
            data: {
                caption,
                images,
                author: { connect: { email: authorEmail  } }
            }
        })
        res.json(post)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}


export const updatePost = async (req:Request, res:Response) => {
    const { id } = req.params
    const { caption, images } =  req.body
    const post = await prisma.post.update({
        where: { id: id},
        data: { caption, images, published: true },
    })
    res.json(post)
}


export const deletePost = async (req:Request, res:Response) => {
    const { id } = req.params
    const post = await prisma.post.delete({
        where: { id: id }
    })

    res.json(post)
}