import { z } from "zod";

export const RegisterSchema = z.object({
  first_name: z.string().min(3, "First name is required"),
  last_name_p: z.string().min(3, "Last name (paternal) is required"),
  last_name_m: z.string().min(3, "Last name (maternal) is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
