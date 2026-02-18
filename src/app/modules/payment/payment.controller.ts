import { Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { paymentServices } from "./payment.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { IJwtPayload } from "../../interface/user.interface";

const createPaymentSession = catchAsyncFn(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const { amount, currency } = req.body;
    const userId = req.user?.id as string;
    const session = await paymentServices.createPaymentSession(
      amount,
      userId,
      currency,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Payment session created successfully",
      data: session,
    });
  },
);

const applyPromoCode = catchAsyncFn(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const { promo } = req.body;
    const userId = req.user?.id as string;
    const session = await paymentServices.applyPromoCode(userId, promo);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Payment session created successfully",
      data: session,
    });
  },
);

const checkOut = catchAsyncFn(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const userId = req.user?.id as string;
    const addressId = req.body.addressId;
    const promoCode = req.body.promoCode;
    const session = await paymentServices.checkOut(
      userId,
      addressId,
      promoCode,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Checkout details retrieved successfully",
      data: session,
    });
  },
);

const buyNowCheckOut = catchAsyncFn(
  async (req: Request & { user?: IJwtPayload }, res: Response) => {
    const userId = req.user?.id as string;
    const { productId, addressId, promoCode } = req.body;
    const session = await paymentServices.buyNowCheckOut(
      userId,
      productId,
      addressId,
      promoCode,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Checkout details retrieved successfully",
      data: session,
    });
  },
);

export const paymentController = {
  createPaymentSession,
  applyPromoCode,
  checkOut,
  buyNowCheckOut,
};
