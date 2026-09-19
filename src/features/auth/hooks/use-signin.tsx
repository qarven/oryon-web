import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { type SignInOutput, signInSchema } from "../model/signin";
import { signInFn } from "../servers/signin.server";

export const useSignIn = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: signInFn,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Sign-in failed",
        description: error.message,
      });
    },
    onSuccess: (output: SignInOutput) => {
      if (output.mfaRequired) {
        router.navigate({
          replace: true,
          to: "/two-factor/app",
        });
        return;
      }

      toast.add({
        type: "info",
        title: "Signed in",
        description: "You have successfully signed in.",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: signInSchema },
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
