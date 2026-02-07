import z from "zod";

export const userSchema=z.object({
    name:z.string().min(3).max(50),
    email:z.email(),
    password:z.string().min(6).max(50),
    role:z.enum(['user','admin']).default('user'),
    isVerified:z.boolean().default(false),
    isDeleted:z.boolean().default(false)
})