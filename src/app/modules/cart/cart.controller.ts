import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { cartServices } from "./cart.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IJwtPayload } from "../../interface/user.interface";

const addToCart=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    req.body.userId=req.user?.id
    const product=await cartServices.addToCart(req.body)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Product added to cart successfully',data:product})
})

const getMyCartItems=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    const product=await cartServices.getMyCartItems(req.user?.id as string)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Cart items fetched successfully',data:product})
})

const updateCartItemQuantity=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    const quantity=Number(req.body.quantity)
    const product=await cartServices.updateCartItemQuantity(req.params.id as string,req.user?.id as string,quantity)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Cart item quantity updated successfully',data:product})
})

const deleteCartItem=catchAsyncFn(async(req:Request &{user?:IJwtPayload},res:Response,next:NextFunction)=>{
    const product=await cartServices.deleteCartItem(req.params.id as string,req.user?.id as string)

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Cart item deleted successfully',data:product})
})


export const  cartController={
    addToCart,
    getMyCartItems,
    updateCartItemQuantity,
    deleteCartItem
}