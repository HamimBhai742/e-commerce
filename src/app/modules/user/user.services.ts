import config from "../../../config";
import { prisma } from "../../lib/prisma";
import { UserPayload } from "../../interface/user.interface";
import bcrypt from 'bcryptjs'

const register=async(payload:UserPayload)=>{
    const hashedPass=await bcrypt.hash(payload.password,config.bcrypt_salt_rounds)
const user =await prisma.user.create({
    data:{
        ...payload,
        password:hashedPass
    }
})

return user
}


export const userServices={
    register
}