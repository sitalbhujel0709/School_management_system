import { Transaction } from "sequelize";
import {sequelize} from "../../../database/connection";
import Subscription from "../../../database/models/Subscription.model";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";

export class AuthService {
  static async registerUser(
    username: string,
    email: string,
    password: string,
  ) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await sequelize.transaction(async(transaction:Transaction)=>{
      const user = await User.create({
        username,
        email,
        password: passwordHash,
      },{transaction});
      await Subscription.create({
        userId: user.id,
        status:"ACTIVE"
      },{transaction})
      return user;
    })
    return result;
  }

  static async loginUser(email: string, password: string){
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    return user;
  }
  
}
