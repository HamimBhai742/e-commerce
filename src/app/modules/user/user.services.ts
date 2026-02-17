import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { UserPayload } from "../../interface/user.interface";
import bcrypt from 'bcryptjs'
import { generateOTP } from "../../utils/generate.otp";
import httpStatus from "http-status";
import { otpQueueEmail } from "../../bullMQ/init";
import { AppError } from "../../error/custom.error";

//register user
const register=async(payload:UserPayload)=>{
    const existingUser = await prisma.user.findFirst({
        where: { email: payload?.email },
    })
    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, "User already exists");
    }
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

await otpQueueEmail.add(
    "registrationOtp",
    { userName: user.name, email: user.email, otpCode:otp, subject: "Your Verification OTP" },
    {
      jobId: `${user.id}-${Date.now()}`,
      removeOnComplete: true,
      attempts: 3,
      backoff: { type: "fixed", delay: 5000 },
    }
  );

//  await sendEmail({
//     to:user.email,
//     subject:'Verify Your Email',
//     templateName:'OtpTemplates',
//     templateData:{...user,otpExpires:2,year:new Date().getFullYear()}
//  })

 return{
    id:user.id,
message:'OTP sent successfully'
 }
    })
 
}

//resend OTP for registration verification
const resendRegistrationOtp=async(email:string)=>{
    const user=await prisma.user.findFirst({
        where:{email}
    })
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found')
    }
    const otp=generateOTP() 
    const otpExpiresAt=new Date(Date.now() + 2 * 60 * 1000)
    await prisma.user.update({
        where:{id:user.id},
        data:{otp,otpExpiresAt}
    })
    await otpQueueEmail.add(
        "registrationOtp",
        { userName: user.name, email: user.email, otpCode:otp, subject: "Your Verification OTP" },
        {
          jobId: `${user.id}-${Date.now()}`,
          removeOnComplete: true,
          attempts: 3,
          backoff: { type: "fixed", delay: 5000 },
        }
      );

      return{
        id:user.id,
        message:'OTP sent successfully'
      }
}


export const userServices={
    register,
    resendRegistrationOtp
}