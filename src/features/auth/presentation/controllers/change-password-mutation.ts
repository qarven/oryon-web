import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { changePasswordSchema } from "../schemas/change-password";

export const changePasswordMutation = createServerFn({ method: "POST" })
  .validator((input) => changePasswordSchema.parse(input))
  .handler(({ data }) => container.getChangePasswordUseCase().exec(data));
