import {Router} from "express";
import { AttendanceController } from "./attendance.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePlan } from "../../middleware/requirePlan";
import { validationHandler } from "../../middleware/validationHandler";
import { createClassAttendanceSchema } from "./attendance.validator";
import { asyncErrorHandler } from "../../middleware/asyncErrorHandler";

const attendanceRouter = Router();

attendanceRouter.post("/:classId",requireAuth,requirePlan(["MAX","PRO"]),validationHandler(createClassAttendanceSchema),asyncErrorHandler(AttendanceController.createClassAttendance));

export default attendanceRouter;