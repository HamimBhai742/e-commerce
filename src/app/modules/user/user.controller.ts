import { NextFunction, Request, Response } from "express";
import { catchAsyncFn } from "../../utils/catchAsyncFn";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const register = catchAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.register(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: user.message,
      data: user.id,
    });
  },
);

const resendRegistrationOtp = catchAsyncFn(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userServices.resendRegistrationOtp(req.body.email);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: user.message,
      data: user.id,
    });
  },
);

export const userController = {
  register,
  resendRegistrationOtp,
};
