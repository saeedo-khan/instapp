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

export interface User extends CustomRequest {
    user: any;
    id: string;
    name: string;
}



const verifyToken = async (req:Request, res:Response, next:NextFunction) => {

    const token = req.cookies.accessToken;
    
    if(!token){
        return res.status(403).json({ message: "Authorization denied, Please login"})
    }

    try {        
        const decoded = <any>jwt.verify(token, process.env.TOKEN_KEY);
        // (req as CustomRequest).token = data;
        (req as CustomRequest).token = decoded
        
        next()        
    } catch (error) {
        res.status(401).send('Please authenticate');
    }
}

export default verifyToken