import { Router } from "express";
import { TenantController } from "./tenant.contoller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePlan } from "../../middleware/requirePlan";
import { asyncErrorHandler } from "../../middleware/asyncErrorHandler";

const tenantRouter = Router();

tenantRouter.post(
  "/setup",
  requireAuth,
  requirePlan(["PRO", "MAX"]),
  asyncErrorHandler(TenantController.setupTenant),
);
tenantRouter.get(
  "/",
  requireAuth,
  requirePlan(["PRO", "MAX"]),
  asyncErrorHandler(TenantController.getTenantByOwner),
)

export default tenantRouter;
