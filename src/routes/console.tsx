import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getAccessSessionFn } from "#/app/servers/session";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { ConsoleHeader } from "#/features/console/shared/components/console-header";
import { ConsoleSidebar } from "#/features/console/shared/components/console-sidebar";

export const Route = createFileRoute("/console")({
  beforeLoad: async () => {
    const token = await getAccessSessionFn();
    if (!token) {
      throw redirect({
        replace: true,
        to: "/signin",
      });
    }

    return { token };
  },
  component: () => (
    <SidebarProvider className="h-svh overflow-hidden">
      <ConsoleSidebar />

      <SidebarInset className="flex min-w-0 flex-col border">
        <ConsoleHeader />

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-auto">
          <main className="mx-auto w-full max-w-7xl p-4">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
});
