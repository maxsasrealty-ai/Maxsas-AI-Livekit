import express, { NextFunction, Request, Response } from "express";

import apiRouter from "./routes";

const app = express();

app.use(
  express.json({
    limit: "2mb",
    verify: (req: Request, _res: Response, buffer: Buffer) => {
      req.rawBody = buffer.toString("utf-8");
    },
  })
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: "Maxsas backend is running",
    },
  });
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route not found: ${req.method} ${req.originalUrl}`,
    },
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: error.message || "Unexpected server error",
    },
  });
});

const port = Number(process.env.PORT || 4000);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

export default app;
