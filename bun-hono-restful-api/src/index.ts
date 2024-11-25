import { Hono } from "hono";
import { userController } from "./controller/user-controller";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", userController);

app.onError(async (error, c) => {
  if (error instanceof HTTPException) {
    return c.json({
      errors: error.message,
    });
  } else if (error instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: error.message,
    });
  } else {
    c.status(500);
    return c.json({
      errors: error.message,
    });
  }
});

export default app;
