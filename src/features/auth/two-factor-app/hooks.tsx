import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { SubmitEvent } from "react";
import { useAppForm } from "#/components/form/use-form";
import { toast } from "#/components/ui/toast";
import { twoFactorAppSchema } from "./schema";
import { verifyTotpFn } from "./service";

export const useTwoFactorApp = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: verifyTotpFn,
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
        title: "Signed in",
        description: "You have successfully signed in.",
      });
      router.navigate({
        replace: true,
        to: "/",
      });
    },
  });

  const form = useAppForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => await mutateAsync({ data: value }),
    validators: { onSubmit: twoFactorAppSchema },
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
