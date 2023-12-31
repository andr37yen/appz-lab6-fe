import React, { createContext, ReactNode } from "react";
import {  AuthContextType } from "../types/types";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {user, signin, signout, update} = useAuth();
  return (
    <AuthContext.Provider value={{user, signin, signout, update}}>
      {children}
    </AuthContext.Provider>
  );
};

