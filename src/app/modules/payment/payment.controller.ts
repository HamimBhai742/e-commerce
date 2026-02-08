import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { paymentServices } from "./payment.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPayment=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const payment=await paymentServices.createPayment(req.body,req.body.sub_total)

    sendResponse(res,{success:true,statusCode:httpStatus.CREATED,message:'Payment created successfully',data:payment})
})


export const  paymentController={
    createPayment
}