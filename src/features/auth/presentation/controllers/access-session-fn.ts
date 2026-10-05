import { createServerFn } from "@tanstack/react-start";
import type { StringOpt } from "../../domain/option-type";
import { container } from "../../injection";

export const getAccessSessionFn = createServerFn({ method: "GET" }).handler(
  (): Promise<StringOpt> => container.getSessionUseCase().exec()
);
