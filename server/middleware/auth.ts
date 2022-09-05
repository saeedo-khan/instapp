import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

declare var process : {
    env: {
      TOKEN_KEY: Secret;
      NODE_ENV: string
    }
}

interface JwtExpPayload {
    expiresIn: string;
    exp: number;
}

export interface CustomRequest extends Request {
token: string | JwtPayload;
}

const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(403).json({ message: "Authorization denied, Please login"})
    }

    try {
        
        const decode = jwt.verify(token, process.env.TOKEN_KEY);
        (req as CustomRequest).token = decode;

        
    } catch (error) {
        res.status(401).json({ message: "Please authenticate"})
    }

    next()
}

export default verifyToken