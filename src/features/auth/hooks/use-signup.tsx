import { useMutation } from "@tanstack/react-query";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { type SignUpOutput, signUpSchema } from "../model/signup";
import { signUpFn } from "../servers/signup-server";

export const useSignUp = () => {
  const { mutateAsync } = useMutation({
    mutationFn: signUpFn,
    onError: (error) => {
      toast.add({
        type: "error",
        description: error.message,
      });
    },
    onSuccess: (output: SignUpOutput) => {
      console.log(output);

      if (output.mfaRequired) {
        toast.add({
          type: "info",
          description: "mfa",
        });
        return;
      }

      toast.add({
        type: "info",
        description: "success",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      captchaToken: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: signUpSchema },
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
