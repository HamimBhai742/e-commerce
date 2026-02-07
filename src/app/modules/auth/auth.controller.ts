import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { authServices } from "./auth.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const login=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const user=await authServices.login(req.body)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'User Login Successfully',data:user})
})


const sentOTP=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const user=await authServices.sendOtp(req.body.email)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:user.message,data:user.id})
})


const verifyOTP=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const user=await authServices.verifyOTP(req.params.id as string,req.body.otp)

    sendResponse(res,{success:true,statusCode:200,message:user.message,data:null})
})


export const  authController={
    login,
    verifyOTP,
    sentOTP
}