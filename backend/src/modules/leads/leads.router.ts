import { Router } from "express";

import { requireTenant } from "../../middleware/requireTenant";
import { getLeadById, listLeads } from "./leads.service";

const leadsRouter = Router();

leadsRouter.get("/", requireTenant, async (req, res) => {
  const tenantId = req.requestContext?.tenantId as string;
  const leads = await listLeads(tenantId);
  res.status(200).json({
    success: true,
    data: leads,
  });
});

leadsRouter.get("/:id", requireTenant, async (req, res) => {
  const tenantId = req.requestContext?.tenantId as string;
  const leadId = String(req.params.id);

  const lead = await getLeadById(tenantId, leadId);
  if (!lead) {
    res.status(404).json({
      success: false,
      error: {
        code: "LEAD_NOT_FOUND",
        message: `Lead ${leadId} not found`,
      },
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: lead,
  });
});

export default leadsRouter;
