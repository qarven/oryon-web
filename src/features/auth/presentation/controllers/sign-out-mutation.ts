import { createServerFn } from "@tanstack/react-start";
import { container } from "../../injection";

export const signOutMutation = createServerFn({ method: "POST" }).handler(() =>
  container.getSignOutUseCase().exec()
);
