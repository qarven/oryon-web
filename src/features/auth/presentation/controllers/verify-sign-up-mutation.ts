import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { verifySignUpSchema } from "../schemas/verify-signup";

export const verifySignUpMutation = createServerFn({ method: "POST" })
  .validator((input) => verifySignUpSchema.parse(input))
  .handler(({ data }) => container.getCompleteRegistrationUseCase().exec(data));
