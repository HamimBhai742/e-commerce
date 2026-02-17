import { Router } from "express";
import { adminController } from "./admin.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";
import { validateRequest } from "../../middleware/validatedRequest";
import { promoZodSchema, updatePromoZodSchema } from "./admin.zod.schema";

const router=Router()

router.patch('/manage-user',checkAuth(Role.ADMIN),adminController.manageUser)
router.patch('/manage-order',checkAuth(Role.ADMIN),adminController.manageOrder)
router.patch('/manage-payment',checkAuth(Role.ADMIN),adminController.managePayment)
router.post('/create-promo-code',checkAuth(Role.ADMIN),validateRequest(promoZodSchema),adminController.createPromoCode)
router.get('/all-promo-codes',checkAuth(Role.ADMIN),adminController.getAllPromoCode)
router.get('/all-used-promo-codes',checkAuth(Role.ADMIN),adminController.getAllUsedPromoCode)
router.put('/update-promo-code/:promoId',checkAuth(Role.ADMIN),validateRequest(updatePromoZodSchema),adminController.updatePromoCode)
router.delete('/delete-promo-code/:promoId',checkAuth(Role.ADMIN),adminController.deletePromoCode)

export const adminRoutes = router