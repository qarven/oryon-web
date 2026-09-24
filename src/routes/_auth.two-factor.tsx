import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getFlowFn } from "#/app/servers/flow";

export const Route = createFileRoute("/_auth/two-factor")({
  beforeLoad: async () => {
    const flow = await getFlowFn();
    if (!flow) {
      throw notFound();
    }

    return { flow };
  },
  component: () => <Outlet />,
});
