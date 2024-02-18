import express, {
  json,
  NextFunction,
  type Request,
  type Response,
  urlencoded,
} from "express";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved, import/extensions
import { RegisterRoutes } from "./routes";

const app = express();

app.use(
  urlencoded({
    extended: true,
  }),
);

app.use(json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  // @ts-ignore
  // eslint-disable-next-line import/no-unresolved
  const docs = await import("./swagger.json");
  return res.send(swaggerUi.generateHTML(docs));
});

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

export { app };
