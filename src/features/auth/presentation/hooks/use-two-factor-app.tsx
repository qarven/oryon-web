import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { verifyTotpMutation } from "../controllers/two-factor-app-mutation";
import { twoFactorAppSchema } from "../schemas/two-factor-app";

export const useTwoFactorApp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifyTotpMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Verification failed",
        description: error.message,
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

  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
      } catch {
        // Surfaced via the onError toast above.
      }
    },
    validators: { onSubmit: twoFactorAppSchema },
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return {
    form,
    onSubmitDefault,
  };
};
