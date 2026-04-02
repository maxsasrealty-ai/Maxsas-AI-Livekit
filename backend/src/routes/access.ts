import { Request, Response, Router } from "express";

import { PlanKey } from "../../../shared/contracts/plans";
import { getPlanCapabilities, getWorkspaceConfigForPlan } from "../services/accessService";

const accessRouter = Router();

accessRouter.get("/capabilities", (req: Request, res: Response) => {
  const rawPlan = String(req.query.plan || "basic").toLowerCase();
  const plan = (["basic", "pro", "enterprise"].includes(rawPlan)
    ? rawPlan
    : "basic") as PlanKey;

  const capabilities = getPlanCapabilities(plan);
  const workspaceConfig = getWorkspaceConfigForPlan(plan);

  res.status(200).json({
    success: true,
    data: {
      capabilities,
      workspaceConfig,
    },
    meta: {
      requestId: req.requestContext?.requestId,
      timestamp: new Date().toISOString(),
    },
  });
});

export default accessRouter;
