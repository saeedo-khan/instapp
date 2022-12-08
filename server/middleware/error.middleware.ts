import { Request, Response, NextFunction } from "express";
export const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong"
    const data = err.data || null;
    res.status(status).json({
        type: "error",
        message,
        data,
    });
};

export const notFoundHandler = (err:any, req:Request, res:Response, next: NextFunction) => {
    const error = {
        status: 404,
        message: "API endpoint does not exist",
    };
    next(error);
};