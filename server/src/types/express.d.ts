import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        subscription?: {
          isActive: boolean;
          status: string | null;
          plan: string | null;
          endDate: Date | null;
        };
      };
    }
  }
}
