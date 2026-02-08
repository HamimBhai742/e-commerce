import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { orderServices } from "./order.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IJwtPayload } from "../../interface/user.interface";

const createOrder=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
   const order=await orderServices.createOrder(req.user?.id as string,req.body.paymentId)

   sendResponse(res, { success:true, statusCode:httpStatus.CREATED, message:'Order created successfully', data:order})
})


export const  orderController={
    createOrder
}