import { Router } from "express";
import { productController } from "./product.controller";
import checkAuth from "../../middleware/checkAuth";
import { Role } from "../../interface/user.interface";
import { validateRequest } from "../../middleware/validatedRequest";
import { productSchema } from "./product.zod.schema";
import { fileUploader } from "../../utils/multer";

const router=Router()

router.post('/create', fileUploader.upload.single('file'),validateRequest(productSchema), checkAuth(Role.ADMIN), productController.createProduct)

router.get('/', productController.getAllProducts)
export const productRoutes=router