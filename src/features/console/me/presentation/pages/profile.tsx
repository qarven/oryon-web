import { Link } from "@tanstack/react-router";
import {
  BadgeCheckIcon,
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";

const user = {
  name: "Ava Thompson",
  username: "ava",
  email: "ava@oryon.com",
  avatar: "/avatars/shadcn.jpg",
  bio: "Product engineer building identity that just works.",
  location: "Jakarta, Indonesia",
  joined: "Joined March 2024",
};

export function Profile() {
  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-medium text-xl">Profile</h1>
          <p className="text-muted-foreground text-sm">
            Your personal identity across Oryon.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link to="/console/me/settings" />}
          variant="outline"
        >
          <PencilIcon />
          Edit profile
        </Button>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
          <Avatar className="size-16" size="lg">
            <AvatarImage alt={user.name} src={user.avatar} />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-lg leading-tight">
                {user.name}
              </span>
              <Badge variant="secondary">
                <BadgeCheckIcon />
                Verified
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              @{user.username} · {user.email}
            </p>
            <p className="text-sm">{user.bio}</p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
              <span className="inline-flex items-center gap-1">
                <MapPinIcon className="size-3.5" />
                {user.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarIcon className="size-3.5" />
                {user.joined}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal info</CardTitle>
          <CardDescription>How you appear to your team.</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Full name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Username</span>
            <span className="font-medium">@{user.username}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Email</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <MailIcon className="size-3.5 text-muted-foreground" />
              {user.email}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Joined</span>
            <span className="font-medium">{user.joined}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
