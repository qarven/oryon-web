import { useSelector } from "@tanstack/react-form";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "#/components/ui/button";
import { Field } from "#/components/ui/field";
import { useFormContext } from "./use-form";

interface SubmitFieldProps extends Omit<ComponentProps<"button">, "type"> {
  children?: ReactNode;
  idleText: string;
  pendingText: string;
}

export default function SubmitButton({
  idleText,
  pendingText,
  children,
}: SubmitFieldProps) {
  const form = useFormContext();
  const [isSubmit] = useSelector(form.store, (state) => [state.isSubmitting]);

  return (
    <Field>
      <Button disabled={isSubmit} type="submit">
        {isSubmit ? pendingText : idleText || ""}
      </Button>
      {children ?? null}
    </Field>
  );
}
