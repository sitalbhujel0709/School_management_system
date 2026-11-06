import type { Request, Response, NextFunction } from "express";
import { ClassesService } from "./classes.service";

export class ClassesController {
  
  static async createClass(req: Request, res: Response) {
    const newClass = await ClassesService.CreateClass(req.body,req.user?.tenant?.tenantCode!);
    return res.status(201).json({
      message: "Class created successfully",
      data: newClass,
    });
  }
  static async getClassesDetails(req: Request, res: Response) {
    const classesDetails = await ClassesService.getClassesDetails({tenantCode:req.user?.tenant?.tenantCode!});
    return res.status(200).json({
      message: "Classes details fetched successfully",
      data: classesDetails,
    });
  }
  static async getClassesDetailsById(req: Request, res: Response) {
    const classId = req.params.classId as string;
    const classDetails = await ClassesService.getClassesDetailsById({tenantCode:req.user?.tenant?.tenantCode!,classId});
    return res.status(200).json({
      message: "Class details fetched successfully",
      data: classDetails,
    });
  }
}