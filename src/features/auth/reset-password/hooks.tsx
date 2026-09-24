import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import type { ResetPasswordOutput } from "./model";
import { resetPasswordSchema } from "./schema";
import { resetPasswordFn } from "./service";

export const useResetPassword = () => {
  const { mutateAsync } = useMutation({
    mutationFn: resetPasswordFn,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "error",
        description: error.message,
      });
    },
    onSuccess: (output: ResetPasswordOutput) => {
      toast.add({
        type: "info",
        title: output.success,
        description: "success",
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
