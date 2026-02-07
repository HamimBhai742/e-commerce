import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import { userSchema } from "./user.zod.schema";

const router=Router()

router.post("/register",validateRequest(userSchema),userController.register)

export const userRoutes=router