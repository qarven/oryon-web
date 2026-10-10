import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { useState } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { resetPasswordMutation } from "../controllers/reset-password-mutation";
import { resetPasswordSchema } from "../schemas/reset-password";

export const useResetPassword = () => {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    mutateAsync,
    isSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: resetPasswordMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Reset Password failed",
        description: error.message,
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      captchaToken: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
        setSubmittedEmail(value.email);
      } catch {
        // Surfaced via the onError toast above.
      }
    },
    validators: { onSubmit: resetPasswordSchema },
  });

  const onSubmitDefault = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const reset = () => {
    setSubmittedEmail(null);
    resetMutation();
  };

  return {
    form,
    onSubmitDefault,
    isSuccess,
    email: submittedEmail,
    reset,
  };
};
