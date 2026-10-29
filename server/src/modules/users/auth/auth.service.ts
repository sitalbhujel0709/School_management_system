import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";

export class AuthService {
  static async registerUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });
    return newUser;
  }
  
}
