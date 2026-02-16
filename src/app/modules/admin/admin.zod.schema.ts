import z from "zod";

export const promoZodSchema=z.object({
    promo:z.string().uppercase().min(3).max(50),
    discount:z.number().min(1).max(100),
    startDate:z.string(),
    expireDate:z.string()
})