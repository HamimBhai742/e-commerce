import { Router } from "express";
import { adminController } from "./admin.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";

const router=Router()

router.patch('/manage-user',checkAuth(Role.ADMIN),adminController.manageUser)
router.patch('/manage-order',checkAuth(Role.ADMIN),adminController.manageOrder)
router.patch('/manage-payment',checkAuth(Role.ADMIN),adminController.managePayment)

export const adminRoutes = router