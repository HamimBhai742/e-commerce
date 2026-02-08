import { IPayment } from "../../interface/paymen"
import { prisma } from "../../lib/prisma"

const createPayment=async(payload:IPayment,sub_total:number)=>{

    const payment=await prisma.payment.create({data:{...payload,sub_total}})
    return payment
}

export const paymentServices={createPayment}