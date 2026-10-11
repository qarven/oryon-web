import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { Switch } from "#/components/ui/switch";

export function NotificationsSettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Notifications</h1>
        <p className="text-muted-foreground text-sm">
          Choose what lands in your inbox.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email notifications</CardTitle>
          <CardDescription>Sent to ava@oryon.com.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Security alerts</p>
              <p className="text-muted-foreground text-sm">
                New sign-ins, password and 2FA changes.
              </p>
            </div>
            <Switch aria-label="Security alerts" defaultChecked disabled />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Product updates</p>
              <p className="text-muted-foreground text-sm">
                New features and improvements.
              </p>
            </div>
            <Switch aria-label="Product updates" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">Marketing</p>
              <p className="text-muted-foreground text-sm">
                Tips, events and occasional offers.
              </p>
            </div>
            <Switch aria-label="Marketing" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
