import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        subscription?: {
          isActive: boolean;
          status: string | null;
          plan: string | null;
          endDate: Date | null;
        };
        tenant?: {
          tenantCode: string | null;
        } 
      };
    }
  }
}
