import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { createAccessToken } from "../../../lib/jwt";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const user = await AuthService.registerUser(username, email, password);
    if(!user) {
      return res.status(400).json({ message: "User registration failed" });
    }
    res.status(201).json({ message: "User registered successfully",data:{user}  });
  }
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);
    if(!user) {
      return res.status(400).json({ message: "User login failed" });
    }
    const token = createAccessToken({ id: user.id, email: user.email });
    res.cookie("accessToken", token, { httpOnly: true,sameSite: 'lax', secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "User logged in successfully" });
  }
  static async getCurrentUser(req: Request, res: Response) {
    const user = req.user;
    if(!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "User fetched successfully", data: { user } });
  }
  static async logoutUser(req: Request, res: Response) {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "User logged out successfully" });
  }
}
