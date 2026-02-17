import { OrderStatus, PaymentStatus } from "../../../../generated/prisma/enums";
import { otpQueueEmail } from "../../bullMQ/init";
import { AppError } from "../../error/custom.error";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import { paymentServices } from "../payment/payment.services";

// const createOrder = async (userId: string,addressId:string) => {
//   const cartItems= await prisma.cart.findMany({where:{userId},include:{product:true}})
//   const cartTotal = cartItems.reduce((total, item) => {
//   return total + item.amount;
//   }, 0);
//   const order_number= `ORD-${Math.floor(Math.random() * 1000000)}`
//   return await prisma.$transaction(async(tx)=>{
//     const payment= await tx.payment.create({data:{userId,sub_total:cartTotal}})
//    await tx.order.create({data:{userId,total_amount:cartTotal,order_number,paymentId:payment.id,addressId}})
//    return await paymentServices.createPaymentSession(cartTotal,userId,'bdt')
//   })
// };

// const createOrder = async (userId: string,addressId:string) => {
//   const cartItems= await prisma.cart.findMany({where:{userId},include:{product:true}})
//   const cartTotal = cartItems.reduce((total, item) => {
//   return total + item.amount;
//   }, 0);
//   const order_number= `ORD-${Math.floor(Math.random() * 1000000)}`
//   return await prisma.$transaction(async(tx)=>{
//     const payment= await tx.payment.create({data:{userId,sub_total:cartTotal}})
//    await tx.order.create({data:{userId,total_amount:cartTotal,order_number,paymentId:payment.id,addressId}})
//   //  return await paymentServices.createPaymentSession(cartTotal,userId,'bdt')
//   })
// };

//order confirmed after payment success
const orderConfirmed = async (
  paymantStatus: PaymentStatus,
  userId: string,
  addressId: string,
  paymentId: string,
  promoCode?: string,
) => {
  if (!userId || !paymantStatus || !addressId || !paymentId)
    throw new Error("Invalid data");
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error("User not found");

    const address = await tx.address.findUnique({
      where: { id: addressId },
    });

    let deleveryTime="3 - 7 days"
    let deleveryCharge=Number(address?.fees)

    if(address?.district==="Dhaka"){
      deleveryTime="2 - 3 days"
    }

    if (!address) throw new Error("Address not found");

    await tx.payment.update({
      where: { id: paymentId },
      data: { status: paymantStatus },
    });

    // 1️⃣ Get user cart
    const cart = await tx.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (!cart) throw new Error("Cart items not found");

    //cart total amount
    let cartTotal = cart.reduce((total, item) => {
      return total + item.amount;
    }, 0);

    //generate order number
    const order_number = `ORD-${Math.floor(Math.random() * 1000000)}`;

    let discount = 0;
    // 1️⃣ Apply Promo Code
    if (promoCode) {
      const promo = await prisma.promoCode.findUnique({
        where: { promo: promoCode },
      });

      if (!promo)
        throw new AppError(httpStatus.NOT_FOUND, "Promo Code not found");
      if (promo.startDate > new Date())
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code not active yet");
      if (promo.expireDate < new Date())
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code Expired");
      if (promo.discount > cartTotal)
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code not valid");
      const usedPromo = await prisma.usedPromo.findUnique({
        where: { promo_userId: { promo: promo.promo, userId } },
      });
      if (usedPromo)
        throw new AppError(httpStatus.BAD_REQUEST, "Promo Code already used");

      if (promo.promo === "WELCOME26") {
        deleveryCharge = 0;
      }

      discount = (cartTotal * promo.discount) / 100;
cartTotal = cartTotal - discount;
      await tx.usedPromo.create({
        data: { userId, promo: promoCode, discount: promo.discount },
      });
    }

    // 2️⃣ Calculate subtotal
    const subtotal = Number(cartTotal);

    const shippingFee = deleveryCharge;
    const totalAmount = subtotal + shippingFee;

    // 3️⃣ Create dynamic orderData
    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      orderDate: new Date().toLocaleDateString(),
      items: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.thumbnail,
      })),
      subtotal,
      shippingFee,
      totalAmount,
      deliveryAddress: address.address,
      paymentMethod: `${paymantStatus===PaymentStatus.CASH? "Cash on Delivery" : "Online Payment"}`,
      orderStatus: OrderStatus.CONFIRMED,
      discountAmount: discount,
      discountPercentage: promoCode ? Number(discount) / subtotal * 100 : 0,
      deleveryTime: deleveryTime
    };

    // 4️⃣ Save Order in DB
    await prisma.order.create({
      data: {
        userId,
        order_number,
        total_amount: totalAmount,
        shippingFee: shippingFee,
        sub_total: subtotal,
        addressId,
        status: OrderStatus.CONFIRMED,
        paymentId,
      },
    });

    //send email
    await otpQueueEmail.add(
      "orderConfirmed",
      {
        userName: user.name,
        email: user.email,
        subject: "Order Confirmed",
        orderData,
      },
      {
        jobId: `${address.id}-${Date.now()}`,
        removeOnComplete: true,
        attempts: 3,
        backoff: { type: "fixed", delay: 5000 },
      },
    );
  });
};

export const orderServices = {
  orderConfirmed,
};
