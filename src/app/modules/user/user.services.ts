import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { UserPayload } from "../../interface/user.interface";
import bcrypt from 'bcryptjs'
import { generateOTP } from "../../utils/generate.otp";
import { sendEmail } from "../../utils/sendEmail";

const register=async(payload:UserPayload)=>{
    const hashedPass=await bcrypt.hash(payload.password,config.bcrypt_salt_rounds)

    const otp=generateOTP()
    const otpExpiresAt=new Date(Date.now() + 2 * 60 * 1000)

   return  await prisma.$transaction(async (tx) => {
           const user =await prisma.user.create({
    data:{
        ...payload,
        password:hashedPass,
        otp,
        otpExpiresAt
    }

    
})

 await sendEmail({
    to:user.email,
    subject:'Verify Your Email',
    templateName:'OtpTemplates',
    templateData:{...user,otpExpires:2,year:new Date().getFullYear()}
 })

 return{
    id:user.id,
message:'OTP sent successfully'
 }
    })
 
}


export const userServices={
    register
}