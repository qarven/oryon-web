import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { resetPasswordSchema } from "../schemas/reset-password";

export const resetPasswordMutation = createServerFn({ method: "POST" })
  .validator((input) => resetPasswordSchema.parse(input))
  .handler(({ data }) => container.getResetPasswordUseCase().exec(data));
