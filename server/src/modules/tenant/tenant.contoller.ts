import type {Request, Response} from "express";
import { TenantService } from "./tenant.service";

export class TenantController {
  static async setupTenant(req: Request, res: Response){
    const tenantOwner = req.user?.id;
    const tenant = await TenantService.setupTenant(tenantOwner!);
    return res.status(201).json({
      message: "Tenant setup successfully",
      data: tenant
    });
  }
  static async getTenantByOwner(req: Request, res: Response){
    const tenantOwner = req.user?.id;
    if(!tenantOwner){
      return res.status(400).json({
        message: "Tenant owner not found"
      });
    }
    const tables = await TenantService.getTenantByOwner(tenantOwner!);
    return res.status(200).json({
      message: "Tenant tables fetched successfully",
      data: tables
    });
  }
}