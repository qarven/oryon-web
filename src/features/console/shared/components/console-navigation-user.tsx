import { Link, useMatchRoute } from "@tanstack/react-router";
import {
  BellIcon,
  KeyRoundIcon,
  Link2Icon,
  PaletteIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "#/components/ui/sidebar.tsx";

interface NavigationItem {
  icon: React.ReactNode;
  name: string;
  url: string;
}

const items: NavigationItem[] = [
  {
    name: "Account",
    url: "/console/me/settings/account",
    icon: <UserIcon />,
  },
  {
    name: "Appearance",
    url: "/console/me/settings/appearance",
    icon: <PaletteIcon />,
  },
  {
    name: "Notifications",
    url: "/console/me/settings/notifications",
    icon: <BellIcon />,
  },
  {
    name: "Connection",
    url: "/console/me/settings/connection",
    icon: <Link2Icon />,
  },
  {
    name: "Password",
    url: "/console/me/settings/password",
    icon: <KeyRoundIcon />,
  },
  {
    name: "Security",
    url: "/console/me/settings/security",
    icon: <ShieldIcon />,
  },
];

export function ConsoleNavigationUser() {
  const matchRoute = useMatchRoute();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>User settings</SidebarGroupLabel>
      <SidebarMenu className="gap-0.5">
        {items.map((item) => {
          const isActive = !!matchRoute({ to: item.url });

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                isActive={isActive}
                render={<Link to={item.url} />}
                tooltip={item.name}
              >
                {item.icon}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
