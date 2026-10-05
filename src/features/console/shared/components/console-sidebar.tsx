import { Link } from "@tanstack/react-router";
import {
  BookOpenIcon,
  BotIcon,
  Settings2Icon,
  TerminalSquareIcon,
} from "lucide-react";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#/components/ui/sidebar.tsx";
import { env } from "#/env";
import { ConsoleNavigation } from "./console-navigation";
import { ConsoleUser } from "./console-user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navFeatures: [
    {
      title: "Playground",
      url: "#",
      icon: <TerminalSquareIcon />,
      items: [
        {
          title: "History",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: <BotIcon />,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
};

export function ConsoleSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="h-16">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link to="/console" />} size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <img
                  alt="icon console"
                  className="size-8 object-contain"
                  height="32"
                  src="/logo192.png"
                  width="32"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {env.VITE_APP_TITLE}
                </span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <ConsoleNavigation items={data.navFeatures} label="Features" />
      </SidebarContent>

      <SidebarFooter>
        <ConsoleUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
