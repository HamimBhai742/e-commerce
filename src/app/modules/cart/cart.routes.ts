import { cartZodSchema } from './cart.zod.schema';
import { Router } from "express";
import { cartController } from "./cart.controller";
import { validateRequest } from "../../middleware/validatedRequest";
import checkAuth from '../../middleware/checkAuth';
import { Role } from '../../interface/user.interface';
import { dailyLimiterMiddleware } from '../../middleware/dailyLimit';

const router=Router()

router.post('/add-to-cart',validateRequest(cartZodSchema),checkAuth(Role.USER),dailyLimiterMiddleware,cartController.addToCart)
router.get('/my-cart',checkAuth(Role.USER),cartController.getMyCartItems)

export const cartRoutes=router