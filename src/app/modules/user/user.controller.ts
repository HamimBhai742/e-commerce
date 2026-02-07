import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const register=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const user=await userServices.register(req.body)

    sendResponse(res,{
        success:true,
        statusCode:201,
        message:'User Register Successfully',
        data:user
    })
})


export const  userController={
    register
}