import * as Z from "zod";

export const createPaymentSchema = Z.object({
  amount: Z.number().positive({ message: "Amount must be a positive number" }),
  currency: Z.enum(["USD", "NRP"], { message: "Currency must be either USD or NRP" }),
  transactionId: Z.uuidv4({ message: "Transaction ID must be a valid UUID" }),
  status: Z.enum(["PENDING", "COMPLETED", "FAILED"], { message: "Status must be either PENDING, COMPLETED, or FAILED" }),
  userId: Z.uuidv4({ message: "User ID must be a valid UUID" })
})

export type CreatePaymentInput = Z.infer<typeof createPaymentSchema>;

export const createSubscriptionSchema = Z.object({
  userId: Z.string().uuid({ message: "User ID must be a valid UUID" }),
  plan: Z.enum(["BASIC", "PRO", "MAX"], { message: "Plan must be either BASIC, PRO, or MAX" }),
  status: Z.enum(["ACTIVE", "INACTIVE", "CANCELLED"], { message: "Status must be either ACTIVE, INACTIVE, or CANCELLED" }),
  startDate: Z.date({ message: "Start date must be a valid date" }),
  endDate: Z.date({ message: "End date must be a valid date" }) || Z.null({ message: "End date can be null" }),
})

export type CreateSubscriptionInput = Z.infer<typeof createSubscriptionSchema>;