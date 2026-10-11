"use client";

import { Link } from "@tanstack/react-router";
import { cn } from "cn";
import { BellIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu.tsx";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "#/components/ui/tooltip";

interface NotificationItem {
  description: string;
  id: string;
  read: boolean;
  time: string;
  title: string;
}

const initialNotifications: NotificationItem[] = [
  {
    description: "Chrome on MacBook Pro · Jakarta.",
    id: "1",
    read: false,
    time: "2m ago",
    title: "New sign-in detected",
  },
  {
    description: "Your password was updated on this device.",
    id: "2",
    read: false,
    time: "1h ago",
    title: "Password changed",
  },
  {
    description: "iPhone Face ID is ready for sign-in.",
    id: "3",
    read: false,
    time: "3h ago",
    title: "Passkey added",
  },
  {
    description: "8 of 10 codes remaining.",
    id: "4",
    read: true,
    time: "5h ago",
    title: "Recovery codes regenerated",
  },
  {
    description: "8 of 10 codes remaining.",
    id: "5",
    read: true,
    time: "5h ago",
    title: "Recovery codes regenerated",
  },
];

export function ConsoleNotification() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const handleMarkAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  const handleItemRead = (id: string) => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const unreadCount = notifications.filter((item) => !item.read).length;
  const badgeLabel = unreadCount > 9 ? "9+" : `${unreadCount}`;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  className="relative rounded-full"
                  size="icon"
                  variant="ghost"
                />
              }
            />
          }
        >
          <BellIcon className="size-4" />
          <span className="sr-only">Notifications</span>
          {unreadCount > 0 ? (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-medium text-[10px] text-primary-foreground">
              {badgeLabel}
            </span>
          ) : null}
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        className="w-80"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between px-2 py-1.5">
            <span className="font-medium text-sm">Notifications</span>
            <Button
              className="h-auto p-0 text-muted-foreground text-xs underline hover:text-primary"
              disabled={unreadCount === 0}
              onClick={handleMarkAllRead}
              size="sm"
              variant="link"
            >
              Mark all as read
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <ScrollArea className="h-64">
          <div className="flex flex-col gap-0.5 p-1">
            {notifications.length === 0 ? (
              <div className="py-4 text-center text-muted-foreground text-sm">
                No notifications
              </div>
            ) : null}
            {notifications.map((item) => (
              <DropdownMenuItem
                className={cn(
                  "flex cursor-pointer flex-col items-start gap-1 rounded-md px-2 py-2 text-left transition-colors",
                  item.read
                    ? "opacity-70"
                    : "bg-muted/40 font-medium hover:bg-muted"
                )}
                key={item.id}
                onClick={() => handleItemRead(item.id)}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-sm leading-none">{item.title}</span>
                  <span className="whitespace-nowrap text-[10px] text-muted-foreground">
                    {item.time}
                  </span>
                </div>
                <span className="line-clamp-2 text-muted-foreground text-xs leading-snug">
                  {item.description}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer justify-center text-center text-muted-foreground focus:bg-muted focus:text-foreground"
          render={
            <Link
              className="w-full"
              to="/console/me/notifications"
              viewTransition
            />
          }
        >
          View all
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
