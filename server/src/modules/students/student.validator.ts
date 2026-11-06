import * as z from "zod";

export const createStudentSchema = z.object({
  full_name: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  email: z.email({ message: "Invalid email address" }),
  date_of_Birth: z.coerce.date({ message: "Date of birth is required" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters long" }),
})

export type CreateStudentInput = z.infer<typeof createStudentSchema>;