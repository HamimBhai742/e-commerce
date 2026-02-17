import { AddressCreateInput } from "../../../../generated/prisma/models";
import { AppError } from "../../error/custom.error";
import { IAddress } from "../../interface/address";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";

//create address
const createAddress=async( data: IAddress)=>{
    console.log(data)
    const existinPhone = await prisma.address.findUnique({
      where: {
        phone: data.phone,
      },
    })

    if(existinPhone){
        throw new AppError(httpStatus.BAD_REQUEST,'Phone number already link to another address')
    }

  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId: data.userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  const address = await prisma.address.create({
    data:{
      ...data,
      fees: data.district === 'Dhaka' ? 60 : 100
    }
  });
  return address;
}

//get my addresses
const getMyAddresses=async(userId:string)=>{
    const address=await prisma.address.findMany({
        where:{userId}
    })
    return address
}

//update address
const updateAddress=async(addressId:string,userId:string,data:Partial<AddressCreateInput>)=>{
    const address=await prisma.address.findUnique({
        where:{id:addressId}
    })
    if(!address){
        throw new AppError(httpStatus.NOT_FOUND,'Address not found')
    }
    if(address.userId!==userId){
        throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized to update this address')
    }
    if (data.isDefault) {
        await prisma.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        });
      }
    return await prisma.address.update({
        where:{id:addressId},
        data:{
            ...data,  
            fees: data.district ? (data.district === 'Dhaka' ? 60 : 100) : address.fees
        }
    })
}

//delete address
const deleteAddress=async(addressId:string,userId:string)=>{
    const address=await prisma.address.findUnique({
        where:{id:addressId}
    })
    if(!address){
        throw new AppError(httpStatus.NOT_FOUND,'Address not found')
    }
    if(address.userId!==userId){
        throw new AppError(httpStatus.UNAUTHORIZED,'You are not authorized to delete this address')
    }
    return await prisma.address.delete({
        where:{id:addressId}
    })
}



export const addressServices={
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress
}

