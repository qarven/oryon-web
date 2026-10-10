import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { completePasswordResetSchema } from "../schemas/complete-password-reset";

export const completePasswordResetMutation = createServerFn({ method: "POST" })
  .validator((input) => completePasswordResetSchema.parse(input))
  .handler(({ data }) =>
    container.getCompletePasswordResetUseCase().exec({
      code: data.code,
      newPassword: data.newPassword,
    })
  );
