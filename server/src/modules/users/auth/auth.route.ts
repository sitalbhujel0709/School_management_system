import {Router} from "express";
import { AuthController } from "./auth.controller";
import { validationHandler } from "../../../middleware/validationHandler";
import { loginUserSchema, registerUserSchema } from "./auth.validator";
import { asyncErrorHandler } from "../../../middleware/asyncErrorHandler";
import { requireAuth } from "../../../middleware/requireAuth";

const AuthRouter = Router();

AuthRouter.post("/register",validationHandler(registerUserSchema),asyncErrorHandler(AuthController.registerUser));
AuthRouter.post("/login",validationHandler(loginUserSchema),asyncErrorHandler(AuthController.loginUser));
AuthRouter.get("/me",requireAuth,asyncErrorHandler(AuthController.getCurrentUser));
AuthRouter.post("/logout",requireAuth,asyncErrorHandler(AuthController.logoutUser));

export default AuthRouter;