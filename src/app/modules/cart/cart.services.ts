import { AppError } from "../../error/custom.error"
import { ICart } from "../../interface/cart"
import { prisma } from "../../lib/prisma"
import httpStatus from "http-status"

const addToCart=async(payload:ICart)=>{
    const product=await prisma.product.findUnique({where:{id:payload.productId}})
    if(!product){throw new AppError(httpStatus.NOT_FOUND,'Product not found')}
    const isExsistCartItems=await prisma.cart.findUnique({where:{productId_userId:{productId:payload.productId,userId:payload.userId}}})
    let amount=Number(payload.quantity * ( product?.discountPrice ?? product?.price))
    if(!isExsistCartItems){
    // amount=Number(payload.quantity * ( product?.discountPrice ?? product?.price))
      return await prisma.cart.create({data:{...payload,amount}})
    }
    const productQuntity=Number(isExsistCartItems?.quantity + payload?.quantity)
    const productAmount=Number(productQuntity * ( product?.discountPrice ?? product?.price))
    return await prisma.cart.update({where:{productId_userId:{productId:payload.productId,userId:payload.userId}},data:{quantity:productQuntity,amount:productAmount}})
}


const getMyCartItems=async(userId:string)=>{
    return await prisma.cart.findMany({where:{userId},include:{product:{
        select:{
            id:true,
            name:true,
            price:true,
            thumbnail:true,
            discountPrice:true
        }
    }}})
}

export const cartServices={
    addToCart,
    getMyCartItems
}