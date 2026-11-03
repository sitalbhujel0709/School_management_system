import * as Z from "zod";

export const createClassSchema = Z.object({
  className: Z.string().min(2, { message: "Class name must be at least 2 characters long" }),
  classLevel: Z.number().int().min(1, { message: "Class level must be a positive integer" }),
  capacity: Z.number().int().min(1, { message: "Capacity must be a positive integer" }),
  seatsAvailable: Z.number().int().min(0, { message: "Seats available must be a non-negative integer" }),
})

export type CreateClassInput = Z.infer<typeof createClassSchema>;