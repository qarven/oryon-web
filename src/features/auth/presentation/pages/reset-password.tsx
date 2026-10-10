import { ResetPasswordForm } from "../components/reset-password-form";
import { ResetPasswordSuccess } from "../components/reset-password-success";
import { SetNewPasswordForm } from "../components/set-new-password-form";
import { useCompletePasswordReset } from "../hooks/use-complete-password-reset";
import { useResetPassword } from "../hooks/use-reset-password";

export function ResetPassword({ token }: { token?: string }) {
  if (token && token.length > 80 && token.length < 100) {
    return <CompletePasswordResetView code={token} />;
  }

  return <RequestPasswordResetView />;
}

function CompletePasswordResetView({ code }: { code: string }) {
  const { form, onSubmitDefault } = useCompletePasswordReset(code);

  return <SetNewPasswordForm form={form} onSubmitDefault={onSubmitDefault} />;
}

function RequestPasswordResetView() {
  const { form, onSubmitDefault, isSuccess, email, reset } = useResetPassword();

  if (isSuccess) {
    return <ResetPasswordSuccess email={email} reset={reset} />;
  }

  return <ResetPasswordForm form={form} onSubmitDefault={onSubmitDefault} />;
}
