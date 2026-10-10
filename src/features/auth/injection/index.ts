import {
  CompleteLoginMfa,
  type CompleteLoginMfaUseCase,
} from "../application/use-cases/complete-login-mfa";
import {
  CompletePasswordReset,
  type CompletePasswordResetUseCase,
} from "../application/use-cases/complete-password-reset";
import {
  CompleteRegistration,
  type CompleteRegistrationUseCase,
} from "../application/use-cases/complete-registration";
import {
  ResendRegistrationCode,
  type ResendRegistrationCodeUseCase,
} from "../application/use-cases/resend-registration-code";
import {
  ResetPassword,
  type ResetPasswordUseCase,
} from "../application/use-cases/reset-password";
import { Session, type SessionUseCase } from "../application/use-cases/session";
import { SignIn, type SignInUseCase } from "../application/use-cases/sign-in";
import {
  SignOut,
  type SignOutUseCase,
} from "../application/use-cases/sign-out";
import { SignUp, type SignUpUseCase } from "../application/use-cases/sign-up";
import { Authentication } from "../infrastructure/services/authentication";
import { Cloudflare } from "../infrastructure/services/cloudflare";
import { Session as SessionApi } from "../infrastructure/services/session";

export interface Dependency {
  completeLoginMfaUseCase: CompleteLoginMfaUseCase;
  completePasswordResetUseCase: CompletePasswordResetUseCase;
  completeRegistrationUseCase: CompleteRegistrationUseCase;
  resetPasswordUseCase: ResetPasswordUseCase;
  resendRegistrationCodeUseCase: ResendRegistrationCodeUseCase;
  sessionUseCase: SessionUseCase;
  signInUseCase: SignInUseCase;
  signOutUseCase: SignOutUseCase;
  signUpUseCase: SignUpUseCase;
}

class Container {
  private readonly dependency: Dependency;

  constructor() {
    // Infrastructure layer
    const authService = new Authentication();
    const captchaService = new Cloudflare();
    const sessionService = new SessionApi();

    // Application layer
    const completeLoginMfaUseCase = new CompleteLoginMfa(authService);
    const completePasswordResetUseCase = new CompletePasswordReset(authService);
    const completeRegistrationUseCase = new CompleteRegistration(authService);
    const resetPasswordUseCase = new ResetPassword(authService, captchaService);
    const resendRegistrationCodeUseCase = new ResendRegistrationCode(
      authService
    );
    const signInUseCase = new SignIn(authService);
    const signOutUseCase = new SignOut(sessionService);
    const signUpUseCase = new SignUp(authService, captchaService);
    const sessionUseCase = new Session(authService);

    this.dependency = {
      completeLoginMfaUseCase,
      completePasswordResetUseCase,
      completeRegistrationUseCase,
      resetPasswordUseCase,
      resendRegistrationCodeUseCase,
      sessionUseCase,
      signInUseCase,
      signOutUseCase,
      signUpUseCase,
    };
  }

  getCompleteLoginMfaUseCase(): CompleteLoginMfaUseCase {
    return this.dependency.completeLoginMfaUseCase;
  }

  getCompletePasswordResetUseCase(): CompletePasswordResetUseCase {
    return this.dependency.completePasswordResetUseCase;
  }

  getCompleteRegistrationUseCase(): CompleteRegistrationUseCase {
    return this.dependency.completeRegistrationUseCase;
  }

  getResetPasswordUseCase(): ResetPasswordUseCase {
    return this.dependency.resetPasswordUseCase;
  }

  getResendRegistrationCodeUseCase(): ResendRegistrationCodeUseCase {
    return this.dependency.resendRegistrationCodeUseCase;
  }

  getSessionUseCase(): SessionUseCase {
    return this.dependency.sessionUseCase;
  }

  getSignInUseCase(): SignInUseCase {
    return this.dependency.signInUseCase;
  }

  getSignOutUseCase(): SignOutUseCase {
    return this.dependency.signOutUseCase;
  }

  getSignUpUseCase(): SignUpUseCase {
    return this.dependency.signUpUseCase;
  }
}

export const container = new Container();
