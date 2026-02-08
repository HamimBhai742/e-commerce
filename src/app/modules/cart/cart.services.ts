import { ICart } from "../../interface/cart"
import { prisma } from "../../lib/prisma"

const addToCart=async(payload:ICart)=>{
    const isExsistCartItems=await prisma.cart.findUnique({where:{productId_userId:{productId:payload.productId,userId:payload.userId}}})
    if(!isExsistCartItems){
      return await prisma.cart.create({data:payload})
    }
    const productQuntity=Number(isExsistCartItems?.quantity + payload?.quantity)
    return await prisma.cart.update({where:{productId_userId:{productId:payload.productId,userId:payload.userId}},data:{quantity:productQuntity}})
}


const getMyCartItems=async(userId:string)=>{
    return await prisma.cart.findMany({where:{userId},include:{product:true}})
}

export const cartServices={
    addToCart,
    getMyCartItems
}