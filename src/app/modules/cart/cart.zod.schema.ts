import z from "zod";

export const cartZodSchema=z.object({
    productId:z.string().min(1),
    quantity:z.number().min(1).optional()
})