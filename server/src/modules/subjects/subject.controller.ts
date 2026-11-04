import type { Request, Response } from "express";
import { SubjectService } from "./subject.service";

export class SubjectController {
  static async createSubject(req: Request, res: Response) {
    const subjectData = req.body;
    const tenantCode = req.user?.tenant?.tenantCode;
    if (!tenantCode) {
      return res.status(400).json({ message: "Tenant code is missing" });
    }
    const newSubject = await SubjectService.createSubject(subjectData, tenantCode);
    return res.status(201).json({
      message: "Subject created successfully",
      data: newSubject,
    });
  }

  static async getSubjectsByClass(req: Request, res: Response) {
    const { classId } = req.params;
    const tenantCode = req.user?.tenant?.tenantCode;
    if (!tenantCode) {
      return res.status(400).json({ message: "Tenant code is missing" });
    }
    const subjects = await SubjectService.getSubjectsByClass(classId as string, tenantCode);
    return res.status(200).json({
      message: "Subjects retrieved successfully",
      data: subjects,
    });
  }
}