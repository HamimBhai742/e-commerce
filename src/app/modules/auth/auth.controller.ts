import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";

const login=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const user=await authServices.login(req.body)

    sendResponse(res,{success:true,statusCode:200,message:'User Login Successfully',data:user})
})


export const  authController={
    login
}