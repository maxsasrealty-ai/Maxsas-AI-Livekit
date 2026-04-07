import express, { Router } from "express";

import { attachRequestContext } from "../middleware/requestContext";
import leadsModuleRouter from "../modules/leads/leads.router";
import voiceEventsRouter from "../modules/voice-events/voice-events.router";
import accessRouter from "./access";
import adminRouter from "./admin";
import callsRouter from "./calls";
import campaignsRouter from "./campaigns";
import capabilitiesRouter from "./capabilities";
import enterpriseAnalyticsRouter from "./enterprise/analytics";
import healthRouter from "./health";
import paymentRouter from "./payment";
import realtimeRouter from "./realtime";

const apiRouter = Router();

apiRouter.use(attachRequestContext("api"));
apiRouter.use("/health", healthRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/access", accessRouter);
apiRouter.use("/capabilities", capabilitiesRouter);
apiRouter.use("/campaigns", campaignsRouter);
apiRouter.use("/enterprise/analytics", enterpriseAnalyticsRouter);
apiRouter.use("/calls", callsRouter);
apiRouter.use("/leads", leadsModuleRouter);
apiRouter.use("/realtime", realtimeRouter);
apiRouter.use("/webhooks", voiceEventsRouter);

// Stripe webhook needs raw body before express.json() has a chance to parse it.
// Mount it before the json-parsing wrapper, using express.raw() for this specific path.
apiRouter.use(
  "/payment/webhook",
  express.raw({ type: "application/json" }),
  paymentRouter
);

// Mount remaining payment routes (create-intent) and wallet routes with normal JSON body.
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/wallet", paymentRouter);

export default apiRouter;
