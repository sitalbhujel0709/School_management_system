import {Router} from "express";
import { AuthController } from "./auth.controller";
import { validationHandler } from "../../../middleware/validationHandler";
import { loginUserSchema, registerUserSchema } from "./auth.validator";
import { asyncErrorHandler } from "../../../middleware/asyncErrorHandler";

const AuthRouter = Router();

AuthRouter.post("/register",validationHandler(registerUserSchema),asyncErrorHandler(AuthController.registerUser));
AuthRouter.post("/login",validationHandler(loginUserSchema),asyncErrorHandler(AuthController.loginUser));

export default AuthRouter;