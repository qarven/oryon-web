import type { AuthenticationService } from "../ports/authentication-service";

export interface CompletePasswordResetInput {
  code: string;
  newPassword: string;
}

export interface CompletePasswordResetUseCase {
  exec: (input: CompletePasswordResetInput) => Promise<void>;
}

export class CompletePasswordReset implements CompletePasswordResetUseCase {
  private readonly authService: AuthenticationService;

  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }

  async exec(input: CompletePasswordResetInput): Promise<void> {
    await this.authService.completePasswordReset({
      code: input.code,
      newPassword: input.newPassword,
    });
  }
}
