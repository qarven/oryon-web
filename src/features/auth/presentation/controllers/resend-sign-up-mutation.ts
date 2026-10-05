import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";

export const resendSignUpMutation = createServerFn({ method: "POST" }).handler(
  () => container.getResendRegistrationCodeUseCase().exec()
);
