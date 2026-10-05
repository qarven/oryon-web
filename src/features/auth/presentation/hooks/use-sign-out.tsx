import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { toast } from "#/components/ui/toast";
import { signOutMutation } from "../controllers/sign-out-mutation";

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: () => signOutMutation(),
    onError: (error) => {
      toast.add({
        type: "error",
        title: "Sign-out failed",
        description: error.message,
      });
    },
    onSuccess: () => {
      queryClient.clear();
      router.navigate({
        replace: true,
        to: "/signin",
      });
    },
  });

  return {
    signOut: mutate,
    signOutAsync: mutateAsync,
    isPending,
  };
};
