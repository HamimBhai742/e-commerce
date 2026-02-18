import { OrderStatus, PaymentStatus } from "../../../../generated/prisma/enums";
import { PromoPayload } from "../../interface/promo";
import { Userstatus } from "../../interface/user.interface";
import { prisma } from "../../lib/prisma";

//get all users
const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

//manage user status
const manageUser = async (status: Userstatus, userId: string) => {
  console.log(status);
  if (status === Userstatus.DELETED) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: status,
    },
  });

  return {
    message: `User ${status} Successfully`,
  };
};

//manage order status
const manageOrder = async (status: OrderStatus, orderId: string) => {
  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status,
    },
  });

  return {
    message: `Order ${status} Successfully`,
  };
};

//manage payment status
const managePayment = async (status: PaymentStatus, paymentId: string) => {
  await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status: status,
    },
  });

  return {
    message: `Payment ${status} Successfully`,
  };
};

//create promo code
const createPromoCode = async (payload: PromoPayload) => {
  if (payload.startDate > new Date()) {
    payload.status = "INACTIVE";
  }
  await prisma.promoCode.create({
    data: payload,
  });
  return {
    message: "Promo Code Created Successfully",
  };
};

//get all promo codes
const getAllPromoCodes = async () => {
  const promocodes = await prisma.promoCode.findMany();
  return promocodes;
};

//get all used promo codes
const getAllUsedPromoCodes = async () => {
  const promocodes = await prisma.usedPromo.findMany();
  return promocodes;
};

const updatePromoCode = async (payload: PromoPayload, promoId: string) => {
  await prisma.promoCode.update({
    where: {
      id: promoId,
    },
    data: payload,
  });
  return {
    message: "Promo Code Updated Successfully",
  };
};

const deletePromoCode = async (promoId: string) => {
  await prisma.promoCode.delete({
    where: { id: promoId },
  });
  return {
    message: "Promo Code Deleted Successfully",
  };
};

export const adminServices = {
  manageUser,
  getAllUsers,
  manageOrder,
  managePayment,
  createPromoCode,
  getAllPromoCodes,
  getAllUsedPromoCodes,
  updatePromoCode,
  deletePromoCode,
};
