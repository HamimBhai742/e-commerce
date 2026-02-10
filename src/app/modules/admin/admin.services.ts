import { OrderStatus, PaymentStatus } from "../../../../generated/prisma/enums"
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


export const adminServices={
    manageUser,
    getAllUsers,
    manageOrder,
    managePayment
}

