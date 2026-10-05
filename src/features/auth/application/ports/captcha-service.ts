export interface CaptchaService {
  verify: (token: string) => Promise<void>;
}
