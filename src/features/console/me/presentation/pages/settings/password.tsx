import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export function PasswordSettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Password</h1>
        <p className="text-muted-foreground text-sm">
          Use a strong, unique password.
        </p>
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
            <CardDescription>
              You will be signed out of other sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <Label htmlFor="settings-current-password">
                Current password
              </Label>
              <Input
                autoComplete="current-password"
                id="settings-current-password"
                name="current-password"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-new-password">New password</Label>
              <Input
                autoComplete="new-password"
                id="settings-new-password"
                name="new-password"
                type="password"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-confirm-password">
                Confirm new password
              </Label>
              <Input
                autoComplete="new-password"
                id="settings-confirm-password"
                name="confirm-password"
                type="password"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button size="sm" type="submit">
              Update password
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
