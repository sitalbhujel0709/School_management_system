import * as z from "zod";

export const createSubjectSchema = z.object({
  subject_name: z.string().min(3, "Subject name is required"),
  subject_code: z.string().min(3, "Subject code is required"),
  credit_hours: z.number().min(1, "Credit hours must be at least 1"),
  class_id: z.string().uuid("Class ID must be a valid UUID"),

})

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;