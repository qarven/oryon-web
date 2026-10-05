import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { changePasswordMutation } from "../controllers/change-password-mutation";
import { changePasswordSchema } from "../schemas/change-password";

export const useChangePassword = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: changePasswordMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Password change failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.add({
        type: "info",
        title: "Password changed",
        description: "You can now sign in with your new password.",
      });

      router.navigate({
        replace: true,
        to: "/signin",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: changePasswordSchema },
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
