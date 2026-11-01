import {Router} from "express";
import { PaymentController } from "./payment.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { asyncErrorHandler } from "../../middleware/asyncErrorHandler";

const paymentRouter = Router();

paymentRouter.post("/signature",requireAuth,asyncErrorHandler(PaymentController.generateSignature));
paymentRouter.post("/verify",requireAuth,asyncErrorHandler(PaymentController.verifyPayment));

export default paymentRouter;