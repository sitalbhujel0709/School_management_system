import {Router} from "express";
import { AuthController } from "./auth.controller";
import { validationHandler } from "../../../middleware/validationHandler";
import { registerUserSchema } from "./auth.validator";

const AuthRouter = Router();

AuthRouter.post("/register",validationHandler(registerUserSchema),AuthController.registerUser);

export default AuthRouter;