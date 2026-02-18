import { AppError } from "../../error/custom.error"
import { ICart } from "../../interface/cart"
import { prisma } from "../../lib/prisma"
import httpStatus from "http-status"

//add to cart
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

//get my cart items
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

//update cart item quantity
const updateCartItemQuantity=async(cartId:string,userId:string,quantity:number)=>{    
    const cartItem=await prisma.cart.findUnique({where:{id:cartId}})
    if(!cartItem){throw new AppError(httpStatus.NOT_FOUND,'Cart item not found')}
    if(cartItem.userId!==userId){throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized to update this cart item')}    
    const product=await prisma.product.findUnique({where:{id:cartItem.productId}})
    if(!product){throw new AppError(httpStatus.NOT_FOUND,'Product not found')}
    const productAmount=Number(quantity * ( product?.discountPrice ?? product?.price))
    return await prisma.cart.update({where:{id:cartId},data:{quantity,amount:productAmount}})
}

//delete cart item
const deleteCartItem=async(cartId:string,userId:string)=>{
    const cartItem=await prisma.cart.findUnique({where:{id:cartId}})
    if(!cartItem){throw new AppError(httpStatus.NOT_FOUND,'Cart item not found')}
    if(cartItem.userId!==userId){throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized to delete this cart item')}
    return await prisma.cart.delete({where:{id:cartId}})
}

export const cartServices={
    addToCart,
    getMyCartItems,
    updateCartItemQuantity,
    deleteCartItem
}