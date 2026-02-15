import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { authSchema, otpSchema, resetPassSchema, sentOtpSchema } from "./auth.zod.schema";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";

const router=Router()

router.post('/login',validateRequest(authSchema),authController.login)

router.post('/verify-otp/:id',validateRequest(otpSchema),authController.verifyRegistrationOTP)

router.post('/sent-otp',validateRequest(sentOtpSchema),authController.sentOTP)

router.post('/forget-password',validateRequest(sentOtpSchema),authController.forgetPassword)

router.post('/reset-password/:id', validateRequest(resetPassSchema), checkAuth(Role.USER),authController.resetPassword)

export const authRoutes=router