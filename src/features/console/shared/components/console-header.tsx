import { Separator } from "#/components/ui/separator";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { ConsoleBreadcrumb } from "./console-breadcrumb";
import { ConsoleNotification } from "./console-notification";

export function ConsoleHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <Separator
          className="mr-2 data-[orientation=vertical]:h-6"
          orientation="vertical"
        />

        <ConsoleBreadcrumb />
      </div>

      <div className="ml-auto flex items-center gap-2 pr-4">
        <ConsoleNotification />
      </div>
    </header>
  );
}
