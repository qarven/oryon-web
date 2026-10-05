import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { verifyResetSchema } from "../schemas/verify-reset";

export const verifyResetMutation = createServerFn({ method: "POST" })
  .validator((input) => verifyResetSchema.parse(input))
  .handler(({ data }) => container.getVerifyResetUseCase().exec(data));
