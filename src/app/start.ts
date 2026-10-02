import { createStart } from "@tanstack/react-start";
import { csrfMiddleware } from "./middlewares/csrf";

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware],
}));
