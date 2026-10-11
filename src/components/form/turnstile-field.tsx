import { Turnstile } from "@marsidev/react-turnstile";
import { useSelector } from "@tanstack/react-form";
import { Field, FieldError } from "#/components/ui/field";
import { env } from "#/env";
import { useFieldContext } from "./use-form";

export default function TurnstileField() {
  const field = useFieldContext<string>();
  const errors = useSelector(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <Turnstile
        onSuccess={(token: string) => field.handleChange(token)}
        options={{ size: "flexible" }}
        siteKey={env.VITE_APP_TURNSTILE_SITE_KEY}
      />
      {isInvalid ? <FieldError className="text-xs" errors={errors} /> : null}
    </Field>
  );
}
