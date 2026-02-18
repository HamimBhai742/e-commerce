import { Router } from "express";
import { orderController } from "./order.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";

const router = Router();

router.post("/create", checkAuth(Role.USER), orderController.createOrder);

export const orderRoutes = router;
