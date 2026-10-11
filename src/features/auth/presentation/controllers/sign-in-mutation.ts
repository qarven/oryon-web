import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { signInSchema } from "../schemas/sign-in";

export const signInMutation = createServerFn({ method: "POST" })
  .validator((input) => signInSchema.parse(input))
  .handler(({ data }) => container.getSignInUseCase().exec(data));
