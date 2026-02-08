import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { productService } from "./product.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const createProduct =catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{

    const product=await productService.createProduct(req)

    sendResponse(res,{success:true,statusCode:httpStatus.CREATED,message:'Product created successfully',data:product})
})


const getAllProducts=catchAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{

    const product=await productService.getAllProducts()

    sendResponse(res,{success:true,statusCode:httpStatus.OK,message:'Products fetched successfully',data:product})
})


export const  productController={
    createProduct,
    getAllProducts
}