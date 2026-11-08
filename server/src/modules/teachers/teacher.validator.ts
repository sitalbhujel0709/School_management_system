import * as z from "zod";

export const createTeacherProfileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  date_of_Birth: z.coerce.date("Invalid date of birth"),
  address: z.string().min(1, "Address is required"),
})


export const assignSubjectsToTeacherSchema = z.object({
  subject_ids: z.array(z.uuid("Subject ID must be a valid UUID")).min(1, "At least one subject ID is required"),
})

export type AssignSubjectsToTeacherInput = z.infer<typeof assignSubjectsToTeacherSchema>;
export type CreateTeacherInput = z.infer<typeof createTeacherProfileSchema>;