import {Router} from "express";
import { ClassesController } from "./classes.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePlan } from "../../middleware/requirePlan";
import { asyncErrorHandler } from "../../middleware/asyncErrorHandler";
import { validationHandler } from "../../middleware/validationHandler";
import { createClassSchema } from "./classes.validator";

const classesRouter = Router();

classesRouter.post("/",requireAuth,requirePlan(["PRO","MAX"]),validationHandler(createClassSchema),asyncErrorHandler(ClassesController.createClass));
classesRouter.get("/",requireAuth,requirePlan(["PRO","MAX"]), asyncErrorHandler(ClassesController.getClassesDetails));

export default classesRouter;