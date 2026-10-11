import { useMutation } from "@tanstack/react-query";
import { toast } from "#/components/ui/toast";
import { resendSignUpMutation } from "../controllers/resend-sign-up-mutation";

export const useResendSignUp = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => resendSignUpMutation(),
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Failed to resend code",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast.add({
        type: "info",
        title: "Code resent",
        description: "A new verification code has been sent to your email.",
      });
    },
  });

  return {
    resendCode: mutate,
    isPending,
  };
};
