import z from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  shortDescription: z.string().optional(),
  price: z.number().nonnegative(),
  discount: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative(),
  isInStock: z.boolean().default(true),
  status: z.enum(["active", "inactive", "deleted"]).default("active"),
  weight: z.number().positive().optional(),
  material: z.string().optional(),
  rating: z.number().min(0).max(5).default(0),
  reviewCount: z.number().int().nonnegative().default(0),
  isFeatured: z.boolean().default(false),
  review: z.array(z.any()).optional()
});
