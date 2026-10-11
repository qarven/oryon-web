import { useSelector } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { useFieldContext } from "./use-form";

interface SelectFieldProps {
  items: { label: string; value: string }[];
  label: string;
  placeholder?: string;
}

export default function SelectField({
  items,
  label,
  placeholder,
}: SelectFieldProps) {
  const field = useFieldContext<string>();
  const errors = useSelector(field.store, (state) => state.meta.errors);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel>{label}</FieldLabel>
      <Select
        onValueChange={(value) => field.handleChange(value ?? "")}
        value={field.state.value}
      >
        <SelectTrigger aria-invalid={isInvalid} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid ? <FieldError className="text-xs" errors={errors} /> : null}
    </Field>
  );
}
