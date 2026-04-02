import { RequestContext } from "./request";

declare global {
  namespace Express {
    interface Request {
      rawBody?: string;
      requestContext?: RequestContext;
    }
  }
}

export { };

