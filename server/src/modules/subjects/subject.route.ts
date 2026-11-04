import {Router} from 'express';
import { requireAuth } from '../../middleware/requireAuth';
import { requirePlan } from '../../middleware/requirePlan';
import { validationHandler } from '../../middleware/validationHandler';
import { createSubjectSchema } from './subject.validator';
import { SubjectController } from './subject.controller';
import { asyncErrorHandler } from '../../middleware/asyncErrorHandler';

const subjectRouter = Router();

subjectRouter.post('/',requireAuth,requirePlan(["PRO","MAX"]),validationHandler(createSubjectSchema),asyncErrorHandler(SubjectController.createSubject));
subjectRouter.get('/:classId',requireAuth,requirePlan(["PRO","MAX"]),asyncErrorHandler(SubjectController.getSubjectsByClass));

export default subjectRouter;