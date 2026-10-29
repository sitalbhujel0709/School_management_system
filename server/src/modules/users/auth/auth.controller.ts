import type { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const user = await AuthService.registerUser(username, email, password);
    if(!user) {
      return res.status(400).json({ message: "User registration failed" });
    }
    res.status(201).json({ message: "User registered successfully", user });
  }
}
