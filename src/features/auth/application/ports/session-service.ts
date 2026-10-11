export interface LogoutRequest {
  refreshToken: string;
}

export interface SessionService {
  logout: (input: LogoutRequest) => Promise<void>;
}
