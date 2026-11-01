
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";
import User from "../database/models/user.model";



export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findByPk(decoded.id,{
      include: ["subscription","payments"]
    });
    if(!user){
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      subscription: {
        isActive: user.subscription?.status === "ACTIVE",
        status: user.subscription?.status,
        plan: user.subscription?.plan,
        endDate: user.subscription?.endDate,
      },
    };
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};