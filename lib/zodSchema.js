import { z } from "zod";

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const otpRegex = /^\d+$/;
export const zSchema = z.object({
    name: z.string().trim().min(1, "Name is required").regex(nameRegex, "Name must contain only letters and spaces"),
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
});
