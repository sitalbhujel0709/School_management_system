import type { Request, Response, NextFunction } from "express";

export const asyncErrorHandler = (fn: Function)=>{
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      console.error(err);
      res.status(500).json({ message: err.message || "Internal Server Error" });
    });
  }
}