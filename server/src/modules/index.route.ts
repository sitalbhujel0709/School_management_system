import {Router} from "express";
import AuthRouter from "./users/auth/auth.route";
import paymentRouter from "./payments/payment.route";

const indexRouter = Router();

indexRouter.use("/users",AuthRouter)
indexRouter.use("/payments",paymentRouter)

export default indexRouter;