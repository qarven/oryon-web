import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { verifySignUpSchema } from "./schema";
import { verifySignUpFn } from "./service";

export const useVerifySignUp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifySignUpFn,
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
        title: "Account verified",
        description: "You have successfully verified your account.",
      });

      router.navigate({
        replace: true,
        to: "/signin",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
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
