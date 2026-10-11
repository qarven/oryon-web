import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { signUpSchema } from "../schemas/sign-up";

export const signUpMutation = createServerFn({ method: "POST" })
  .validator((input) => signUpSchema.parse(input))
  .handler(({ data }) => container.getSignUpUseCase().exec(data));
