/**
 * Represents an authentication token used for session management and API authorization.
 *
 * @interface AuthToken
 *
 * @property {string} access_token - The access token used for API authorization to access the APIs related to Digital Sale.
 * @property {number} expires_in - The duration in seconds before the access token expires.
 * @property {string} token_type - Displays the type of token returned..
 * @property {string} scope - The variable where the user profile type is stored..
 * @property {string} idSession - The unique identifier for the user session.
 * @property {string} refresh_token - It is the session identifier, which will be used to manage the use of multiple sessions.
*/

export type AuthToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  idSession: string;
  refresh_token: string;
};
