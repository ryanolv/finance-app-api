import { z } from "zod";

export const transactionSchema = z.object({
  user_id: z
    .string({
      required_error: "User ID is required",
    })
    .uuid({ message: "User ID must be a valid UUID" }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .trim()
    .min(2, { message: "Name must be at least 2 character long" }),
  amount: z.number({
    required_error: "Amount is required",
  }),
  type: z.enum(["EARNING", "EXPENSE", "INVESTMENT"], {
    required_error: "Type is required",
  }),
  date: z
    .string({
      required_error: "Date is required",
    })
    .refine(
      (dateString) => {
        const dateObject = new Date(dateString);
        return !isNaN(dateObject.getTime());
      },
      {
        message: "Date must be a valid date string",
      },
    )
    .transform((dateString) => new Date(dateString)),
});
