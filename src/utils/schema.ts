import { z } from "zod";

const ALLOWED_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

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

export const createJobSchema = z.object({
    title: z.string().trim().min(1,'title cannot be empty'),

    jobType: z.enum(["full-time", "part-time", "contract"], {
      required_error: "Please select a job type",
      invalid_type_error: "Invalid job type selection"
    }),

    workLocation: z.enum(["remote", "onsite", "hybrid"], {
      required_error: "Please select a work location",
      invalid_type_error: "Invalid work location selection"
    }),

    image: z.custom<File>()
    .refine(file => file instanceof File, 'File is required')
    .refine(file => file.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
    .refine( (file) => ALLOWED_MIME_TYPES.includes(file.type),
      "Only .png, .jpeg, and .webp formats are supported."
    ),

    priceRangeMin: z.coerce.number()
    .min(1, "Minimum price cannot be negative")
    .max(1_000_000, "Maximum price too high"),
    
    priceRangeMax: z.coerce.number()
      .min(0, "Maximum price cannot be negative")
      .max(1_000_000, "Maximum price too high")
      .optional()
  }).refine(data => {
  // Ensure max is greater than min if both are provided
  if (data.priceRangeMin && data.priceRangeMax) {
    return data.priceRangeMax >= data.priceRangeMin;
  }
});

export const editJobSchema = z.object({
  title: z.string().trim().min(1,'title cannot be empty'),

  jobType: z.enum(["full-time", "part-time", "contract"], {
    required_error: "Please select a job type",
    invalid_type_error: "Invalid job type selection"
  }),

  workLocation: z.enum(["remote", "onsite", "hybrid"], {
    required_error: "Please select a work location",
    invalid_type_error: "Invalid work location selection"
  }),

  image: z.custom<File | string | undefined>().optional(),

  priceRangeMin: z.coerce.number()
  .min(1, "Minimum price cannot be negative")
  .max(1_000_000, "Maximum price too high"),
  
  priceRangeMax: z.coerce.number()
    .min(0, "Maximum price cannot be negative")
    .max(1_000_000, "Maximum price too high")
    .optional()
}).refine(data => {
// Ensure max is greater than min if both are provided
if (data.priceRangeMin && data.priceRangeMax) {
  return data.priceRangeMax >= data.priceRangeMin;
}
});

export const createBlogSchema = z.object({
  title: z.string().trim().min(1,'title cannot be empty'),

  mainImage: z.custom<File>()
  .refine(file => file instanceof File, 'File is required')
  .refine(file => file.size <= 5 * 1024 * 1024, 'Max file size is 5MB')
  .refine( (file) => ALLOWED_MIME_TYPES.includes(file.type),
    "Only .png, .jpeg, and .webp formats are supported."
  ),
  author: z.string().trim().min(1,'Author cannot be empty'),
  tags: z.string().array().nonempty()
});

export const editBlogSchema = z.object({
  title: z.string().trim().min(1,'title cannot be empty'),
  mainImage: z.custom<File | string | undefined>().optional(),
  author: z.string().trim().min(1,'Author cannot be empty'),
  tags: z.string().array().nonempty()
});