import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/browser";
import { startAuthentication, WebAuthnError } from "@simplewebauthn/browser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "#/components/ui/toast";
import {
  beginWebAuthnMutation,
  completeWebAuthnMutation,
} from "../controllers/two-factor-webauthn-mutation";

function toUserMessage(error: unknown): string {
  if (error instanceof WebAuthnError) {
    if (error.code === "ERROR_CEREMONY_ABORTED") {
      return "Passkey verification was cancelled. Try again when ready.";
    }
    return error.message;
  }
  return error instanceof Error ? error.message : "Passkey verification failed";
}

export const useTwoFactorWebauthn = () => {
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      if (typeof window.PublicKeyCredential === "undefined") {
        throw new Error(
          "This browser does not support passkeys. Use an authenticator app or a recovery code instead."
        );
      }
      const { requestOptionsJson } = await beginWebAuthnMutation();

      const options = JSON.parse(
        requestOptionsJson
      ) as PublicKeyCredentialRequestOptionsJSON;

      const assertion = await startAuthentication({ optionsJSON: options });
      await completeWebAuthnMutation({
        data: { assertionResponseJson: JSON.stringify(assertion) },
      });
    },
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Passkey verification failed",
        description: toUserMessage(error),
      });
    },
    onSuccess: () => {
      router.navigate({
        replace: true,
        to: "/console",
      });

      toast.add({
        type: "info",
        title: "Signed in",
        description: "You have successfully signed in.",
      });
    },
  });

  return {
    handlePasskey: () => mutate(),
    isPending,
  };
};
