export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

export type Role = 'STUDENT' | 'ADMIN';