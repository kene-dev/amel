import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .nonempty("Password is required"),
  });


  export const shippingSchema = z.object({
    address: z.string().min(1, 'Please input your delivery address'),
    city: z.string().min(1, 'Please input your city'),
    postalCode: z.coerce.number().optional(),
    country: z.string().min(1, 'Please input your country'),
    coupon:z.string().optional(),
    saveShipping: z.boolean(),
    paymentMethod: z.enum(["card", "cash"]),
    instructions: z.string().optional()
  })