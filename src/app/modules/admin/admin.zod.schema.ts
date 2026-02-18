import z from "zod";

export const promoZodSchema=z.object({
    promo:z.string().uppercase().min(3).max(50),
    discount:z.number().min(1).max(100),
    status:z.enum(["ACTIVE","INACTIVE","EXPIRED"]),
    startDate:z.string(),
    expireDate:z.string()
})

export const updatePromoZodSchema=z.object({
    promo:z.string().uppercase().min(3).max(50).optional(),
    discount:z.number().min(1).max(100).optional(),
    startDate:z.string().optional(),
    expireDate:z.string().optional()
})