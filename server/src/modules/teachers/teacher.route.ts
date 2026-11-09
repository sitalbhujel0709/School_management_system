import {Router} from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requirePlan } from '../../middleware/requirePlan';
import { validationHandler } from '../../middleware/validationHandler';
import { assignSubjectsToTeacherSchema, createTeacherProfileSchema } from './teacher.validator';
import { TeacherController } from './teacher.controller';
import { asyncErrorHandler } from '../../middleware/asyncErrorHandler';

const teacherRouter = Router();

teacherRouter.post('/',requireAuth,requirePlan(["PRO","MAX"]),validationHandler(createTeacherProfileSchema),asyncErrorHandler(TeacherController.createTeacherProfile));
teacherRouter.post('/:teacherId/assign-subjects',requireAuth,requirePlan(["PRO","MAX"]),validationHandler(assignSubjectsToTeacherSchema),asyncErrorHandler(TeacherController.assignSubjectsToTeacher));
teacherRouter.get('/',requireAuth,requirePlan(["PRO","MAX"]),asyncErrorHandler(TeacherController.getAllTeachers));
teacherRouter.get('/:teacherId',requireAuth,requirePlan(["PRO","MAX"]),asyncErrorHandler(TeacherController.getTeacherById));


export default teacherRouter;
