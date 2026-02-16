import { AddressCreateInput } from "../../../../generated/prisma/models";
import { AppError } from "../../error/custom.error";
import { IAddress } from "../../interface/address";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";

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
    data
  });

  if(address.district !== 'Dhaka'){
   await prisma.address.update({
    where:{id:address.id},
    data:{fees:100}
   })
  }

  return address;
}

const getMyAddresses=async(userId:string)=>{
    const address=await prisma.address.findMany({
        where:{userId}
    })
    return address
}



export const addressServices={
    createAddress,
    getMyAddresses
}

