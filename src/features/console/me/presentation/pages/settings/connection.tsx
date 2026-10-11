import { LaptopIcon, SmartphoneIcon } from "lucide-react";
import { Apple } from "#/components/logos/apple";
import { Github } from "#/components/logos/github";
import { Google } from "#/components/logos/google";
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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "#/components/ui/item";

export function ConnectionSettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Connection</h1>
        <p className="text-muted-foreground text-sm">
          Social logins and devices with access.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Linked accounts</CardTitle>
          <CardDescription>Social logins connected to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <span className="size-4">
                  <Google />
                </span>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Google</ItemTitle>
                <ItemDescription>ava@oryon.com</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">Connected</Badge>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <span className="size-4">
                  <Github />
                </span>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>GitHub</ItemTitle>
                <ItemDescription>@ava-dev</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">Connected</Badge>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <span className="size-4">
                  <Apple />
                </span>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Apple</ItemTitle>
                <ItemDescription>Not connected</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" type="button" variant="outline">
                  Connect
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
          <CardDescription>Review devices with access.</CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <LaptopIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  MacBook Pro · Chrome{" "}
                  <Badge variant="secondary">Current</Badge>
                </ItemTitle>
                <ItemDescription>
                  Jakarta, Indonesia · Active now
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <SmartphoneIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>iPhone 16 · Oryon app</ItemTitle>
                <ItemDescription>
                  Jakarta, Indonesia · Active 2h ago
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" type="button" variant="ghost">
                  Revoke
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <Button size="sm" type="button" variant="ghost">
            Sign out all other sessions
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
