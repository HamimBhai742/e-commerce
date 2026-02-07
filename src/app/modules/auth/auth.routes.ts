import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { authSchema } from "./auth.zod.schema";

const router=Router()

router.post('/login',validateRequest(authSchema),authController.login)

export const authRoutes=router