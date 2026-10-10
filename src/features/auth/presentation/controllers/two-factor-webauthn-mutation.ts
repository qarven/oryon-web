import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";
import { twoFactorWebauthnSchema } from "../schemas/two-factor-webauthn";

export const beginWebAuthnMutation = createServerFn({ method: "POST" }).handler(
  () => container.getBeginWebAuthnLoginUseCase().exec()
);

export const completeWebAuthnMutation = createServerFn({ method: "POST" })
  .validator((input) => twoFactorWebauthnSchema.parse(input))
  .handler(({ data }) =>
    container.getCompleteWebAuthnLoginUseCase().exec(data)
  );
