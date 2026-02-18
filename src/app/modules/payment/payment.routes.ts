import { Router } from "express";
import { paymentController } from "./payment.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";

const router=Router()

router.post("/create-session",paymentController.createPaymentSession)
router.post("/apply-promo-code",checkAuth(Role.USER),paymentController.applyPromoCode)
router.get("/checkout",checkAuth(Role.USER),paymentController.checkOut)
router.get("/buy-now-checkout",checkAuth(Role.USER),paymentController.buyNowCheckOut)
export const paymentRoutes=router