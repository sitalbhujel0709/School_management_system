import {Router} from "express";
import AuthRouter from "./users/auth/auth.route";

const indexRouter = Router();

indexRouter.use("/users",AuthRouter)

export default indexRouter;