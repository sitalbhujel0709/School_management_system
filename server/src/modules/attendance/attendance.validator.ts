import * as z from "zod";

export const createClassAttendanceSchema = z.object({
  date: z.coerce.date(),
  students: z.array(
    z.object({
      studentId: z.uuid("Invalid student ID"),
      status: z.enum(["present", "absent", "late", "excused"]),
    }))
  
})