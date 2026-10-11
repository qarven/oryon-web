import type { Checkbox as CheckboxPrimitive } from "@base-ui/react";
import { useSelector } from "@tanstack/react-form";
import type { ComponentProps } from "react";
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { useFieldContext } from "./use-form";

interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label: string;
}

export default function CheckboxField({ label, ...props }: CheckboxProps) {
  const field = useFieldContext<boolean>();
  const errors = useSelector(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid} orientation="horizontal">
      <Checkbox
        aria-invalid={isInvalid}
        checked={field.state.value === true}
        id={field.name}
        name={field.name}
        onBlur={field.handleBlur}
        onCheckedChange={(v: boolean) => field.handleChange(v === true)}
        {...props}
      />
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      {isInvalid ? <FieldError className="text-xs" errors={errors} /> : null}
    </Field>
  );
}
