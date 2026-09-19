import type { ComponentProps, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card.tsx";
import { FieldGroup } from "#/components/ui/field";

interface FormLayoutProps extends Omit<ComponentProps<"form">, "noValidate"> {
  children: ReactNode;
  subtitle: string;
  title: string;
}

export function FormLayout({
  title,
  subtitle,
  children,
  ...props
}: FormLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <form noValidate {...props}>
            <FieldGroup>{children}</FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
