import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../../generated/prisma/client";
import { AppError } from "../error/custom.error";

export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
     let statusCode = 500;
     let message = 'Something went wrong!';
     let errorSource: Record<string, any> = {};

     // Check if the error is an AppError
     if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

     // Check if the error is a ZodError
      if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";

      errorSource = err.issues.map(issue => ({
      path: issue.path.length ? issue.path.join(".") : "body",
      message: issue.message,
    }));
  }

  // Check if the error is a Prisma error
    else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate value error";

const field = (err.meta as any)?.driverAdapterError?.cause?.constraint?.fields?.[0]
    
errorSource = [
        {
          path: field || "unknown",
          message: `${field} already exists`,
        },
      ];
    }
  }



  console.log(err)

     res.status(statusCode).json({
        success:false,
        message,
        errorSource
     })
}