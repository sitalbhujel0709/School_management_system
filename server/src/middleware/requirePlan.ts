import type { Request, Response, NextFunction } from "express";

export const requirePlan = (plans: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userPlan = req.user?.subscription?.plan;
    if (!userPlan || !plans.includes(userPlan) || !req.user?.subscription?.isActive) {
      return res.status(403).json({ message: "Forbidden: Insufficient plan" });
    }
    next();
  }
}