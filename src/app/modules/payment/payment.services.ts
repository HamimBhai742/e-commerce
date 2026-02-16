import { OrderStatus } from "../../../../generated/prisma/enums";
import { AppError } from "../../error/custom.error";
import { OnlinePayment, PaymentStatus } from "../../interface/paymen";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import httpStatus from 'http-status'

const createPaymentSession = async (amount: number, userId:string,currency:string) => {
   const session=await stripe.checkout.sessions.create({
        mode:'payment'  ,
        line_items:[
            {
                price_data:{
                    currency,
                    unit_amount:amount*100,
                    product_data:{
                        name:'E-commerce payment'
                    }
                },
                quantity:1
            }
        ]
        ,
        success_url:'http://localhost:3000/success',
        cancel_url:'http://localhost:3000/cancel',
        customer_creation:'always',
        metadata:{userId}
    })
    console.log(session)

  return session.url;
};

const paymentSuccess=async(userId:string,paymentId:string,orderId:string)=>{
const payment=await prisma.payment.findUnique({where:{
    id:paymentId
}})

if(!payment){
    throw new AppError(httpStatus.NOT_FOUND,'Payment not found')
}

return await prisma.$transaction(async(tx)=>{
await tx.payment.update({
    where:{
        id:paymentId
    },data:{
        status:PaymentStatus.PAID
    }
})

await tx.order.update({
    where:{
        paymentId
    },
    data:{
        status:OrderStatus.CONFIRMED
    }
})
})
}

const paymentCancel=async(userId:string,paymentId:string,orderId:string)=>{

}

const paymentCash=async(paymentId:string)=>{
return await prisma.$transaction(async(tx)=>{
    const payment = await tx.payment.findUnique({
        where:{
            id:paymentId
        }
    })

    await tx.payment.update({
        where:{
            id:paymentId
        },
        data:{
            status:PaymentStatus.CASH
        }
    })

    await tx.order.update({
        where:{
            paymentId
        },
        data:{
            status:OrderStatus.CONFIRMED
        }
    })
})
}


const paymentOnline=async(paymentId:string,payload:OnlinePayment)=>{
    return await prisma.$transaction(async(tx)=>{
       const payment=await tx.payment.update({
        where:{
            id:paymentId
        },
        data:{
status:PaymentStatus.PENDING
        }
       })

      const online= await tx.onlinePayment.create({
        data:{
            amount:payment.sub_total,
            payment_method:payload.payment_method,
            phone:payload.phone,
            transactionId:payload.transactionId,
        }
       })

       await  tx.payment.update({
        where:{
            id:paymentId
        },
        data:{
            onlinePayId:online.id
        }
       })
    })
}

const applyPromoCode=async(userId:string,promoCode:string)=>{
    let cartTotal = 5600;
    const promo = await prisma.promoCode.findUnique({
        where: { promo: promoCode },
      });

      if (!promo)
        throw new AppError(httpStatus.NOT_FOUND, "Promo Code does not exist");
    if(promo.startDate > new Date())
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code deal not started");
      if (promo.expireDate < new Date())
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code Expired");
      if (promo.discount > cartTotal)
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code not valid");
      if (promo.userId === userId)
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code already used");
let discount=Number(cartTotal * promo.discount / 100)
      cartTotal = cartTotal - discount;
console.log(cartTotal,discount)
    //   await tx.promoCode.update({
    //     where: { id: promo.id },
    //     data: { userId },
    //   });
}
export const paymentServices = {
    createPaymentSession,
    applyPromoCode
};