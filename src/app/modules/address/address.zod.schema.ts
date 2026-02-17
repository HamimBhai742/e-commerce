import z from "zod";

export enum District {
  Dhaka = "Dhaka",
  Chattogram = "Chattogram",
  Khulna = "Khulna",
  Rajshahi = "Rajshahi",
  Barishal = "Barishal",
  Sylhet = "Sylhet",
  Rangpur = "Rangpur",
  Mymensingh = "Mymensingh",
}

export const addressSchema=z.object({
    address:z.string().min(3).max(500).optional(),
    phone:z.string().regex(/^(?:\+?88)?01[3-9]\d{8}$/).min(11,'invalid phone').max(11,'invalid phone'),
    aptNumber:z.string().min(2).max(50),
    aptName:z.string().min(3).max(50),
    street:z.string().min(1).max(50),            
    sub_district:z.string().min(3).max(50),            
    district:z.enum(District),            
    postalCode:z.string().min(3).max(50),            
    isDefault:z.boolean().optional(),            
})

