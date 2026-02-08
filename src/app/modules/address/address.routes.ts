import { Router } from "express";
import { addressController } from "./address.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";
import { validateRequest } from "../../middleware/validatedRequest";
import { addressSchema } from "./address.zod.schema";

const router=Router()

router.post('/create',validateRequest(addressSchema),checkAuth(Role.USER),addressController.createAddress)

router.get('/my-addresses',checkAuth(Role.USER),addressController.getMyAddresses)

export const addressRoutes=router