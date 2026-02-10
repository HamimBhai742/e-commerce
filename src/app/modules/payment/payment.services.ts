import { stripe } from "../../lib/stripe";

const createPaymentSession = async (amount: number, userId:string,currency:string) => {
   const session=await stripe.checkout.sessions.create({
        mode:'payment'  ,
        line_items:[
            {
                price_data:{
                    currency,
                    unit_amount:amount*100,
                    product_data:{
                        name:'E-commerce payment'
                    }
                },
                quantity:1
            }
        ]
        ,
        success_url:'http://localhost:3000/success',
        cancel_url:'http://localhost:3000/cancel',
        customer_creation:'always',
        metadata:{userId}
    })
    console.log(session)

  return session.url;
};

export const paymentServices = {
    createPaymentSession,
};