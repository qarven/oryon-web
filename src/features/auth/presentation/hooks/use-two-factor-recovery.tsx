import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { verifyRecoveryCodeMutation } from "../controllers/two-factor-recovery-mutation";
import { twoFactorRecoverySchema } from "../schemas/two-factor-recovery";

export const useTwoFactorRecovery = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifyRecoveryCodeMutation,
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
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: twoFactorRecoverySchema },
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
