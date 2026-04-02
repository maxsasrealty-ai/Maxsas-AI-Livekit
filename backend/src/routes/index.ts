import { Router } from "express";

import { attachRequestContext } from "../middleware/requestContext";
import accessRouter from "./access";
import adminRouter from "./admin";
import callsRouter from "./calls";
import campaignsRouter from "./campaigns";
import capabilitiesRouter from "./capabilities";
import healthRouter from "./health";
import realtimeRouter from "./realtime";
import voiceWebhookRouter from "./webhooks/voice";

const apiRouter = Router();

apiRouter.use(attachRequestContext("api"));
apiRouter.use("/health", healthRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/access", accessRouter);
apiRouter.use("/capabilities", capabilitiesRouter);
apiRouter.use("/campaigns", campaignsRouter);
apiRouter.use("/calls", callsRouter);
apiRouter.use("/realtime", realtimeRouter);
apiRouter.use("/webhooks/voice", voiceWebhookRouter);

export default apiRouter;
