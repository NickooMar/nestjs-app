export interface Signup {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface Signin {
  email: string;
  password: string;
}

export interface Profile {
  exp: number;
  iat: number;
  sub: string;
  username: string;
}

export interface ProtectedRouteProps {
  children?: React.ReactNode;
  isAuthenticated: boolean;
}
