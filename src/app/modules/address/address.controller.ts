import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { IJwtPayload } from "../../interface/user.interface";
import { addressServices } from "./address.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAddress=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    req.body.userId=req.user?.id
    const address=await addressServices.createAddress(req.body)

    sendResponse(res,{success:true,statusCode:httpStatus.CREATED,message:'Address created successfully',data:address})
})

const getMyAddresses=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    const address=await addressServices.getMyAddresses(req.user?.id as string)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Addresses fetched successfully',data:address})
})



export const  addressController={
    createAddress,
    getMyAddresses
}