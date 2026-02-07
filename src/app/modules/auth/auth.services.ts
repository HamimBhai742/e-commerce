import { AppError } from "../../error/custom.error";
import { ILoginPayload } from "../../interface/login.interface";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import  bcrypt from 'bcryptjs'
import { createUserToken } from "../../utils/createUserToken";
import { generateOTP } from "../../utils/generate.otp";
import { sendEmail } from "../../utils/sendEmail";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

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

const sendOtp=async(email:string)=>{
    const user=await prisma.user.findUnique({where:{email}})

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found')
    }

    const otp=generateOTP()
    const otpExpiresAt=new Date(Date.now() + 2 * 60 * 1000)
 
    return await prisma.$transaction(async (tx) => {
        await prisma.user.update({
            where:{id:user.id},
            data:{otp,otpExpiresAt}
        })
        await sendEmail({
            to:user.email,
            subject:'Verify Your Email',
            templateName:'OtpTemplates',
            templateData:{...user,otpExpires:2,year:new Date().getFullYear(),otp}
        })
        return{
            id:user.id,
            message:'OTP sent successfully'
        }
    })
  
}

const verifyOTP = async (userId: string, inputOtp: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(httpStatus.NOT_FOUND,"User not found");
  if (user.isVerified) throw new AppError( httpStatus.BAD_REQUEST,"User already verified");
  if (!user.otp || !user.otpExpiresAt) throw new AppError( httpStatus.BAD_REQUEST,"No OTP set");
  if (user.otpExpiresAt < new Date()) throw new AppError(httpStatus.BAD_REQUEST,"OTP expired");
  if (user.otp !== inputOtp) throw new AppError(httpStatus.BAD_REQUEST,"Invalid OTP");

  // OTP valid → verify user
  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true, otp: null, otpExpiresAt: null },
  });

  return { message: "User verified successfully" };
};


const forgetPassword=async(email:string)=>{
    const user=await prisma.user.findUnique({where:{email}})
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found')
    }
  const token = createUserToken(user);

  const resetUrl = `${config.client_url}/reset-password?token=${token.accessToken}&id=${user.id}`;
 
  return await prisma.$transaction(async (tx) => {

   await  tx.user.update({
      where: { id: user.id },
      data: { otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000) },
    });

     sendEmail({
    to: user.email,
    subject: 'Reset Password',
    templateName: 'forgetPassword',
    templateData: {
        appName: 'Example App',
      name: user.name,
      resetUrl,
      expiresIn: 2,
      year: new Date().getFullYear(),
      supportUrl:'https://support.example.com/support'
    },
  });

  return {
    id: user.id,
    message: 'Password reset link sent successfully',
  };
  })
}

const resetPassword=async(id:string,password:string)=>{
    const user=await prisma.user.findUnique({where:{id}})
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND,'User not found')
    }
    if(user.otpExpiresAt && user.otpExpiresAt < new Date()){
        throw new AppError(httpStatus.BAD_REQUEST,'OTP expired')
    }
    const hashedPass=await bcrypt.hash(password,config.bcrypt_salt_rounds)
     await prisma.user.update({where:{id},data:{password:hashedPass,otpExpiresAt:null}})
     return{
        id:user.id,
        message:'Password reset successfully'
     }
}




export const authServices={
    login,
    verifyOTP,
    sendOtp,
    forgetPassword,
    resetPassword
}