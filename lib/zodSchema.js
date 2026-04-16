import { z } from "zod";
// import coerce from "zod-coerce";
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const otpRegex = /^\d+$/;
const objectIdRegex = /^[a-f\d]{24}$/i;
const skuRegex = /^[A-Za-z0-9_-]+$/;
export const zSchema = z.object({
    code: z.string().trim().min(1, "Code is required").regex(skuRegex, "Code can only contain letters, numbers, hyphens, and underscores"),
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email address").regex(emailRegex, "Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be at most 64 characters long")
        .regex(
            strongPasswordRegex,
            "Password must include uppercase, lowercase, number, and special character"
        ),
    otp: z
        .string()
        .trim()
        .min(1, "OTP is required")
        .length(6, "OTP must be a 6-digit number")
        .regex(otpRegex, "OTP must contain only numbers"),
    _id: z.string().trim().min(3, "ID is required"),
    alt: z.string().trim().min(3, "Alt text is required"),
    title: z.string().trim().min(3, "Title is required"),
    slug: z.string().min(3, "Slug must be at least 3 characters long").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)"),
    
    
    category: z.string().trim().regex(objectIdRegex, "Invalid category"),
    product: z.string().trim().regex(objectIdRegex, "Invalid product"),
    color: z.string().trim().min(1, "Color is required").regex(nameRegex, "Color must contain only letters and spaces"),
    size: z.string().trim().min(1, "Size is required"),
    sku: z.string().trim().min(1, "SKU is required").regex(skuRegex, "SKU can only contain letters, numbers, hyphens, and underscores"),
    mrp: z.coerce.number().positive("MRP must be greater than 0"),
    sellingPrice: z.coerce.number().positive("Selling price must be greater than 0"),
    discountPercentage: z.coerce.number().min(0, "Discount must be at least 0").max(100, "Discount cannot exceed 100"),
    minShoppingAmount: z.coerce.number().min(0, "Minimum shopping amount must be at least 0"),
    validity: z.coerce.date({ message: "Validity must be a valid date" }),
    description: z.string().trim().min(1, "Description is required"),
    media: z.array(z.string()),
   

});
