export interface User {
  email: string;
  provider?: string;
  id?: string;
  name?: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  authToken?: string;
  idToken?: string;
  authorizationCode?: string;
  response?: string;
}
