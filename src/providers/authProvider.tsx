import React, { createContext, ReactNode } from "react";
import {  IPatient } from "../types/types";
import { useAuth } from "../hooks/useAuth";

interface AuthContextType {
  user: IPatient | null;
  signin: (emain: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {user, signin, signout} = useAuth();
  return (
    <AuthContext.Provider value={{user, signin, signout}}>
      {children}
    </AuthContext.Provider>
  );
};

