import { createContext } from "react";

export interface User {
  id?: string;
  email?: string;
  name?: string;
  //** todo: Add more properties here
}

export interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (params: any, errorCallback?: (error: any) => void) => Promise<void>;
  logout: () => void;
  // ** Todo: add other method example updateProfile or changePassword,...
}

export const defaultProvider: AuthContextProps = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => {},
};

export const AuthContext = createContext<AuthContextProps>(defaultProvider);
