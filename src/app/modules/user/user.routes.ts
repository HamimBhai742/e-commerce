import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { resendOtpSchema, userSchema } from "./user.zod.schema";

const router=Router()

router.post("/register",validateRequest(userSchema),userController.register)

router.post("/resend-registration-otp",validateRequest(resendOtpSchema),userController.resendRegistrationOtp)

export const userRoutes=router