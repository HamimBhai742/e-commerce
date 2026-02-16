import { Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { adminServices } from "./admin.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const manageUser = catchAsyncFn(async (req: Request, res: Response) => {
  const user = await adminServices.manageUser(req.body.status, req.body.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: user.message,
    data: null,
  });
});

const manageOrder = catchAsyncFn(async (req: Request, res: Response) => {
  const user = await adminServices.manageOrder(
    req.body.status,
    req.body.orderId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: user.message,
    data: null,
  });
});

const managePayment = catchAsyncFn(async (req: Request, res: Response) => {
  const user = await adminServices.managePayment(
    req.body.status,
    req.body.paymentId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: user.message,
    data: null,
  });
});

const createPromoCode = catchAsyncFn(
  async (req: Request & { user?: any }, res: Response) => {
    const { id } = req.user;
    const user = await adminServices.createPromoCode(req.body, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: user.message,
      data: null,
    });
  },
);

const getAllPromoCode = catchAsyncFn(
  async (req: Request, res: Response) => {
    const user = await adminServices.getAllPromoCodes();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Retrieved all promocodes successfully",
      data: user,
    });
  },
);


const getAllUsedPromoCode = catchAsyncFn(
  async (req: Request, res: Response) => {
    const user = await adminServices.getAllUsedPromoCodes();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Retrieved all promocodes successfully",
      data: user,
    });
  },
)
export const adminController = {
  manageUser,
  manageOrder,
  managePayment,
  createPromoCode,
  getAllPromoCode,
  getAllUsedPromoCode
};
