import config from "../../config"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcryptjs'

export const seedAdmin=async()=>{
    const email=config.admin.email
    const pass=config.admin.password
    const role=config.admin.role
    const admin=await prisma.user.findFirst({where:{email,role}})
    if(admin)return console.log('Admin already exists')
    const hashedPass=await bcrypt.hash(pass,config.bcrypt_salt_rounds)

   await prisma.user.create({data:{name:'admin',email,password:hashedPass,role,isVerified:true}})


}