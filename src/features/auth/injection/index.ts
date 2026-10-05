import {
  ChangePassword,
  type ChangePasswordUseCase,
} from "../application/use-cases/change-password";
import {
  CompleteLoginMfa,
  type CompleteLoginMfaUseCase,
} from "../application/use-cases/complete-login-mfa";
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
import {
  VerifyReset,
  type VerifyResetUseCase,
} from "../application/use-cases/verify-reset";
import { Authentication } from "../infrastructure/services/authentication";
import { Cloudflare } from "../infrastructure/services/cloudflare";
import { Session as SessionApi } from "../infrastructure/services/session";

export interface Dependency {
  changePasswordUseCase: ChangePasswordUseCase;
  completeLoginMfaUseCase: CompleteLoginMfaUseCase;
  completeRegistrationUseCase: CompleteRegistrationUseCase;
  resetPasswordUseCase: ResetPasswordUseCase;
  resendRegistrationCodeUseCase: ResendRegistrationCodeUseCase;
  sessionUseCase: SessionUseCase;
  signInUseCase: SignInUseCase;
  signOutUseCase: SignOutUseCase;
  signUpUseCase: SignUpUseCase;
  verifyResetUseCase: VerifyResetUseCase;
}

class Container {
  private readonly dependency: Dependency;

  constructor() {
    // Infrastructure layer
    const authService = new Authentication();
    const captchaService = new Cloudflare();
    const sessionService = new SessionApi();

    // Application layer
    const changePasswordUseCase = new ChangePassword(authService);
    const completeLoginMfaUseCase = new CompleteLoginMfa(authService);
    const completeRegistrationUseCase = new CompleteRegistration(authService);
    const resetPasswordUseCase = new ResetPassword(authService);
    const resendRegistrationCodeUseCase = new ResendRegistrationCode(
      authService
    );
    const signInUseCase = new SignIn(authService);
    const signOutUseCase = new SignOut(sessionService);
    const signUpUseCase = new SignUp(authService, captchaService);
    const verifyResetUseCase = new VerifyReset();
    const sessionUseCase = new Session(authService);

    this.dependency = {
      changePasswordUseCase,
      completeLoginMfaUseCase,
      completeRegistrationUseCase,
      resetPasswordUseCase,
      resendRegistrationCodeUseCase,
      sessionUseCase,
      signInUseCase,
      signOutUseCase,
      signUpUseCase,
      verifyResetUseCase,
    };
  }

  getChangePasswordUseCase(): ChangePasswordUseCase {
    return this.dependency.changePasswordUseCase;
  }

  getCompleteLoginMfaUseCase(): CompleteLoginMfaUseCase {
    return this.dependency.completeLoginMfaUseCase;
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

  getVerifyResetUseCase(): VerifyResetUseCase {
    return this.dependency.verifyResetUseCase;
  }
}

export const container = new Container();
