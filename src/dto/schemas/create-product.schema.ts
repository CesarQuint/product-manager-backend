import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive("Price must be greater than 0"),
  company: z.string().min(1, "Company is required"),
  category: z.string().min(1, "Category is required"),
});

export type ProductInput = z.infer<typeof ProductSchema>;
