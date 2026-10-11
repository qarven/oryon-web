import { FingerprintIcon, KeyRoundIcon, ShieldCheckIcon } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

export function SecuritySettings() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-medium text-xl">Security</h1>
        <p className="text-muted-foreground text-sm">
          Add extra layers of protection.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Two-factor & passkeys</CardTitle>
          <CardDescription>
            Require more than a password to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <ShieldCheckIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Authenticator app <Badge variant="secondary">On</Badge>
                </ItemTitle>
                <ItemDescription>
                  Codes from Google Authenticator or 1Password
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" type="button" variant="outline">
                  Manage
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <FingerprintIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Passkeys <Badge variant="secondary">2</Badge>
                </ItemTitle>
                <ItemDescription>
                  MacBook Touch ID · iPhone Face ID
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" type="button" variant="outline">
                  Manage
                </Button>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <KeyRoundIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Recovery codes</ItemTitle>
                <ItemDescription>8 of 10 codes remaining</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" type="button" variant="ghost">
                  Regenerate
                </Button>
              </ItemActions>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
    </div>
  );
}
