import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { resetPasswordSchema } from "./schema";
import { resetPasswordFn } from "./service";

export const useResetPassword = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: resetPasswordFn,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Reset Password failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      router.navigate({
        replace: true,
        to: "/verify-reset",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: resetPasswordSchema },
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
