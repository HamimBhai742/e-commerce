import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from "zod";

export const validateRequest=(zodSchema:ZodObject<ZodRawShape>)=>(req:Request,res:Response,next:NextFunction)=>{
try {
    req.body= zodSchema.parse(req.body)
    next()
} catch (error) {
    next(error)
}
}