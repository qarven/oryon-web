import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { verifyResetMutation } from "../controllers/verify-reset-mutation";
import { verifyResetSchema } from "../schemas/verify-reset";

export const useVerifyReset = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifyResetMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Verification failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.add({
        type: "info",
        title: "Email verified",
        description: "Set a new password to continue.",
      });

      router.navigate({
        replace: true,
        to: "/change-password",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: verifyResetSchema },
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
