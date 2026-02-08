import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/products/product.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { addressRoutes } from "../modules/address/address.routes";

const router =Router();

const routes=[
    {
        path:'/users',
        route:userRoutes
    },
    {
        path:'/auth',
        route:authRoutes
    },
    {
        path:'/products',
        route:productRoutes
    },
    {
        path:'/cart',
        route:cartRoutes
    },
    {
        path:'/address',
        route:addressRoutes
    }
]


routes.forEach(route=>{
    router.use(route.path,route.route)
})

export default router