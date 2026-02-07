import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { authSchema, otpSchema, sentOtpSchema } from "./auth.zod.schema";

const router=Router()

router.post('/login',validateRequest(authSchema),authController.login)

router.post('/verify-otp/:id',validateRequest(otpSchema),authController.verifyOTP)

router.post('/sent-otp',validateRequest(sentOtpSchema),authController.sentOTP)

export const authRoutes=router