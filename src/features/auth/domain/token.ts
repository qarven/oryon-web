export interface Token {
  accessToken: string;
  expiresIn: bigint; // in seconds
  refreshToken: string;
}
