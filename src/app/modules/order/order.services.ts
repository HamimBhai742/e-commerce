import { OrderStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";




const createOrder = async (userId: string,paymentId:string) => {
  const cartItems= await prisma.cart.findMany({where:{userId},include:{product:true}})
  const cartTotal = cartItems.reduce((total, item) => {
  return total + item.amount;
  }, 0);
  const order_number= `ORD-${Math.floor(Math.random() * 1000000)}`
  return await prisma.order.create({data:{userId,total_amount:cartTotal,order_number,paymentId}})
  
};


export const orderServices = {
    createOrder,
};