export type AuthToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  idSession: string;
  refresh_token: string;
};
