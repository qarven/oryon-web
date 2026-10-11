import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";

const themes = [
  { icon: <MonitorIcon />, label: "System", value: "system" },
  { icon: <SunIcon />, label: "Light", value: "light" },
  { icon: <MoonIcon />, label: "Dark", value: "dark" },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

export function AppearanceSettings() {
  const [theme, setTheme] = useState<ThemeValue>("system");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Appearance</h1>
        <p className="text-muted-foreground text-sm">
          Localize your console experience.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance & language</CardTitle>
          <CardDescription>Theme, language and timezone.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-2" role="radiogroup">
              {themes.map((option) => {
                const active = theme === option.value;
                return (
                  <Button
                    aria-pressed={active}
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    type="button"
                    variant={active ? "secondary" : "outline"}
                  >
                    {option.icon}
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Timezone</Label>
              <Select defaultValue="jakarta">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                  <SelectItem value="singapore">
                    Asia/Singapore (GMT+8)
                  </SelectItem>
                  <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
