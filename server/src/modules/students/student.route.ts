import {Router} from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePlan } from "../../middleware/requirePlan";
import { StudentController } from "./student.controller";
import { asyncErrorHandler } from "../../middleware/asyncErrorHandler";
import { validationHandler } from "../../middleware/validationHandler";
import { createStudentSchema } from "./student.validator";

const studentRouter = Router();

studentRouter.post("/",requireAuth,requirePlan(["PRO","MAX"]),validationHandler(createStudentSchema),asyncErrorHandler(StudentController.createStudent));
studentRouter.post("/:studentId/assign-class",requireAuth,requirePlan(["PRO","MAX"]),asyncErrorHandler(StudentController.assignStudentToClass));
studentRouter.get("/",requireAuth,requirePlan(["PRO","MAX"]),asyncErrorHandler(StudentController.getAllStudents));

export default studentRouter;