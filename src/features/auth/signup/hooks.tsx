import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { signUpSchema } from "./schema";
import { signUpFn } from "./service";

export const useSignUp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: signUpFn,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Sign-up failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      router.navigate({
        replace: true,
        to: "/verify-signup",
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
