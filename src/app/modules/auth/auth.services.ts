import { AppError } from "../../error/custom.error";
import { ILoginPayload } from "../../interface/login.interface";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import  bcrypt from 'bcryptjs'
import { createUserToken } from "../../utils/createUserToken";

const login=async(payload:ILoginPayload)=>{
    const user=await prisma.user.findUnique({where:{email:payload.email}})
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found')
    }

    const isPasswordMatch=await bcrypt.compare(payload.password,user.password)
    if(!isPasswordMatch){
        throw new AppError(httpStatus.UNAUTHORIZED,'Incorrect password')
    }

    if(!user.isVerified){
        throw new AppError(httpStatus.UNAUTHORIZED,'User is not verified')
    }

    if(user.isDeleted){
        throw new AppError(httpStatus.UNAUTHORIZED,'User is deleted')
    }

    const token=createUserToken(user)
    return {
        accessToken:token.accessToken
    }
}

export const authServices={
    login
}