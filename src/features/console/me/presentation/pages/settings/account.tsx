import { Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
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
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "#/components/ui/item";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";

export function AccountSettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Account</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile, email and account.
        </p>
      </div>

      <form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This information is visible to your team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-14" size="lg">
                <AvatarImage alt="Ava Thompson" src="/avatars/shadcn.jpg" />
                <AvatarFallback>AT</AvatarFallback>
              </Avatar>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" type="button" variant="outline">
                  Upload photo
                </Button>
                <Button size="sm" type="button" variant="ghost">
                  Remove
                </Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="settings-name">Full name</Label>
                <Input
                  defaultValue="Ava Thompson"
                  id="settings-name"
                  name="name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="settings-username">Username</Label>
                <Input
                  defaultValue="ava"
                  id="settings-username"
                  name="username"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-bio">Bio</Label>
              <Textarea
                defaultValue="Product engineer building identity that just works."
                id="settings-bio"
                name="bio"
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button size="sm" type="button" variant="outline">
              Discard
            </Button>
            <Button size="sm" type="submit">
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </form>

      <form onSubmit={(event) => event.preventDefault()}>
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              Used for sign-in, alerts and recovery.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ItemGroup>
              <Item variant="muted">
                <ItemContent>
                  <ItemTitle>
                    ava@oryon.com <Badge variant="secondary">Verified</Badge>
                  </ItemTitle>
                  <ItemDescription>Primary email address</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="settings-email">New email</Label>
              <Input
                autoComplete="email"
                id="settings-email"
                name="email"
                placeholder="you@company.com"
                type="email"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button size="sm" type="submit" variant="outline">
              Change email
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Deleting your account removes all workspaces and data.
          </CardDescription>
        </CardHeader>
        <CardFooter className="items-center justify-between gap-2 bg-transparent p-4">
          <p className="text-muted-foreground text-sm">
            This action cannot be undone.
          </p>
          <Button size="sm" type="button" variant="destructive">
            <Trash2Icon />
            Delete account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
