import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { productRoutes } from "../modules/products/product.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { addressRoutes } from "../modules/address/address.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { paymentRoutes } from "../modules/payment/payment.routes";
import { subscriptionRouter } from "../modules/stripe/stripe.route";

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
    },
    {
        path:'/orders',
        route:orderRoutes
    },
    {
        path:'/payments',
        route:paymentRoutes
    },
    {
        path:'/subscriptions',
        route:subscriptionRouter
    }
]


routes.forEach(route=>{
    router.use(route.path,route.route)
})

export default router