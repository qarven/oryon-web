import { useSelector } from "@tanstack/react-form";
import { OTPInput } from "input-otp";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { InputOTPGroup, InputOTPSlot } from "#/components/ui/input-otp";
import { useFieldContext } from "./use-form";

interface OtpFieldProps {
  autoFocus?: boolean;
  disabled?: boolean;
  label: string;
  length?: number;
  onComplete?: (code: string) => void;
}

export default function OtpField({
  label,
  length = 6,
  disabled,
  autoFocus,
  onComplete,
}: OtpFieldProps) {
  const field = useFieldContext<string>();
  const errors = useSelector(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const slots = Array.from({ length }, (_, index) => index);

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <OTPInput
        aria-invalid={isInvalid}
        autoComplete="one-time-code"
        autoFocus={autoFocus}
        disabled={disabled}
        id={field.name}
        inputMode="numeric"
        maxLength={length}
        onBlur={field.handleBlur}
        onChange={(value) => field.handleChange(value)}
        onComplete={(code) => {
          field.handleChange(code);
          onComplete?.(code);
        }}
        value={field.state.value}
      >
        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-10 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-lg">
          {slots.map((index) => (
            <InputOTPSlot index={index} key={index} />
          ))}
        </InputOTPGroup>
      </OTPInput>
      {isInvalid ? <FieldError className="text-xs" errors={errors} /> : null}
    </Field>
  );
}
