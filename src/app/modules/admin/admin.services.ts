import { OrderStatus, PaymentStatus } from "../../../../generated/prisma/enums"
import { PromoPayload } from "../../interface/promo"
import { Userstatus } from "../../interface/user.interface"
import { prisma } from "../../lib/prisma"

const getAllUsers=async()=>{
    const users=await prisma.user.findMany()
    return users
}
const manageUser =async(status:Userstatus,userId:string)=>{
console.log(status)
    if(status===Userstatus.DELETED){

        await prisma.user.update({
              where:{
        id:userId
    },
    data:{
        isDeleted:true
    }
        })
    }

 await prisma.user.update({
    where:{
        id:userId
    },
    data:{
        status:status
    }
})

return{
    message:`User ${status} Successfully`
}
}

const manageOrder=async(status:OrderStatus,orderId:string)=>{
await prisma.order.update({
    where:{
        id:orderId
    },
    data:{
        status:status
    }
})

return{
    message:`Order ${status} Successfully`
}
}


const managePayment=async(status:PaymentStatus,paymentId:string)=>{
await prisma.payment.update({
    where:{
        id:paymentId
    },
    data:{
        status:status
    }
})

return{
    message:`Payment ${status} Successfully`
}
}  

const createPromoCode=async(payload:PromoPayload,userId:string)=>{
    await prisma.promoCode.create({
        data:{
            ...payload,
            userId
        }
    })
    return {
        message:"Promo Code Created Successfully"
    }
}

const getAllPromoCodes=async(userId:string)=>{
    const promocodes=await prisma.promoCode.findMany({
        where:{userId}
    })
    return promocodes
}


export const adminServices={
    manageUser,
    getAllUsers,
    manageOrder,
    managePayment,
    createPromoCode,
    getAllPromoCodes
}

