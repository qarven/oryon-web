import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { completePasswordResetMutation } from "../controllers/complete-password-reset-mutation";
import { completePasswordResetSchema } from "../schemas/complete-password-reset";

export const useCompletePasswordReset = (code: string) => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: completePasswordResetMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Password change failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      router.navigate({
        replace: true,
        to: "/signin",
      });

      toast.add({
        type: "info",
        title: "Password changed",
        description: "You can now sign in with your new password.",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      code,
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
      } catch {
        // Surfaced via the onError toast above.
      }
    },
    validators: { onSubmit: completePasswordResetSchema },
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
