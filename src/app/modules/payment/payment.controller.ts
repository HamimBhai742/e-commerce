import { Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { paymentServices } from "./payment.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPaymentSession=catchAsyncFn(async(req:Request,res:Response)=>{
    const {amount,currency}=req.body
    const session= await paymentServices.createPaymentSession(amount,currency)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Payment session created successfully",
        data: session,
    })
})

export const paymentController={
    createPaymentSession
}