import { Router } from "express";
import { adminController } from "./admin.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";
import { validateRequest } from "../../middleware/validatedRequest";
import { promoZodSchema } from "./admin.zod.schema";

const router=Router()

router.patch('/manage-user',checkAuth(Role.ADMIN),adminController.manageUser)
router.patch('/manage-order',checkAuth(Role.ADMIN),adminController.manageOrder)
router.patch('/manage-payment',checkAuth(Role.ADMIN),adminController.managePayment)
router.post('/create-promo-code',checkAuth(Role.ADMIN),validateRequest(promoZodSchema),adminController.createPromoCode)
router.get('/all-promo-codes',checkAuth(Role.ADMIN),adminController.getAllPromoCode)

export const adminRoutes = router