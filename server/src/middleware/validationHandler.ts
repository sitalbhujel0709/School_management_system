import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
export const validationHandler = (schema: z.ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((err: z.core.$ZodIssue) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({ message: "Validation failed", errors });
    }
    req.body = result.data; // Update req.body with the validated data
    next();
  }
}