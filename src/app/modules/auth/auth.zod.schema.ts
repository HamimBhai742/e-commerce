import z from "zod";

export const authSchema=z.object({
    email:z.email(),
    password:z.string().min(6).max(50)
})

export const otpSchema=z.object({
    otp:z.string().min(6).max(6)
})

export const sentOtpSchema=z.object({
    email:z.email()
})