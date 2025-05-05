import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({
      required_error: "First name is required.",
      invalid_type_error: "First name must be a string.",
    })
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters long.",
    }),
  last_name: z
    .string({
      required_error: "Last name is required.",
      invalid_type_error: "Last name must be a string.",
    })
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters long.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .trim()
    .min(5, {
      message: "Email must be at least 5 characters long.",
    })
    .email({
      message: "Please, provide a valid email.",
    }),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters long.",
    }),
});

export const updateUserSchema = z.object({
  first_name: z
    .string({
      invalid_type_error: "First name must be a string.",
    })
    .trim()
    .min(2, {
      message: "First name must be at least 2 characters long.",
    })
    .optional(),
  last_name: z
    .string({
      invalid_type_error: "Last name must be a string.",
    })
    .trim()
    .min(2, {
      message: "Last name must be at least 2 characters long.",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string.",
    })
    .trim()
    .min(5, {
      message: "Email must be at least 5 characters long.",
    })
    .email({
      message: "Please, provide a valid email.",
    })
    .optional(),
  password: z
    .string({
      invalid_type_error: "Password must be a string.",
    })
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters long.",
    })
    .optional(),
});
