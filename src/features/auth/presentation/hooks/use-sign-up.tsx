import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { signUpMutation } from "../controllers/sign-up-mutation";
import { signUpSchema } from "../schemas/sign-up";

export const useSignUp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: signUpMutation,
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
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
      } catch {
        // Surfaced via the onError toast above.
      }
    },
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
