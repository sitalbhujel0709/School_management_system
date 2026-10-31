import * as Z from "zod";

export const createPaymentSchema = Z.object({
  amount: Z.number().positive({ message: "Amount must be a positive number" }),
  currency: Z.enum(["USD", "NRP"], { message: "Currency must be either USD or NRP" }),
  transactionId: Z.uuidv4({ message: "Transaction ID must be a valid UUID" }),
  status: Z.enum(["PENDING", "COMPLETED", "FAILED"], { message: "Status must be either PENDING, COMPLETED, or FAILED" }),
  userId: Z.uuidv4({ message: "User ID must be a valid UUID" })
})

export type CreatePaymentInput = Z.infer<typeof createPaymentSchema>;