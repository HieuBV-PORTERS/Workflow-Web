import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/router";
import authConfig from "@/config/auth";
import {
  AuthContext,
  defaultProvider,
  User,
  AuthContextProps,
} from "./AuthProvider";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.tokenKey);
      if (storedToken) {
        setLoading(true);
        // ** Todo: call api login here
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (
    params: any,
    errorCallback?: (error: any) => void
  ) => {
    try {
      //** Todo */ Call api login with endpoint login is authConfig.login
      if (params.rememberMe) {
        window.localStorage.setItem(authConfig.tokenKey, "valueOfToken");
      }
      // ** Todo: setUser() information here.
      // Saving user information use  window.localStorage.setItem("userData", "valuehere")
      const redirectURL = "/";
      router.replace(redirectURL); // Redirect to special page when login success or not
    } catch (err) {
      if (errorCallback) errorCallback(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userData");
    window.localStorage.removeItem(authConfig.tokenKey);
    router.push("/login");
  };

  const values: AuthContextProps = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

export { AuthContext, AuthProvider };
