import {Router} from "express";
import AuthRouter from "./users/auth/auth.route";
import paymentRouter from "./payments_subscription/payment.route";
import tenantRouter from "./tenant/tenant.route";
import classesRouter from "./classes/classes.route";
import studentRouter from "./students/student.route";
import teacherRouter from "./teachers/teacher.route";
import subjectRouter from "./subjects/subject.route";

const indexRouter = Router();

indexRouter.use("/users",AuthRouter)
indexRouter.use("/payments",paymentRouter);
indexRouter.use("/tenant",tenantRouter)
indexRouter.use("/classes",classesRouter)
indexRouter.use("/students",studentRouter)
indexRouter.use("/teachers",teacherRouter)
indexRouter.use("/subjects",subjectRouter)

export default indexRouter;