export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  image: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  auth_token?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  email: string;
  firstName: string;
  lastName: string;
}
