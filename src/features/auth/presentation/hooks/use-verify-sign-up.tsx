import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { verifySignUpMutation } from "../controllers/verify-sign-up-mutation";
import { verifySignUpSchema } from "../schemas/verify-signup";

export const useVerifySignUp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifySignUpMutation,
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Verification failed",
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
        title: "Account verified",
        description: "You have successfully verified your account.",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
      } catch {
        // Surfaced via the onError toast above.
      }
    },
    validators: { onSubmit: verifySignUpSchema },
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
