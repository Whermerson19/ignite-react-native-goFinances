import React, { createContext, useContext } from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContext {
  user: IUser;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Invalid context");

  return context;
}

export function AuthProvider({ children }: IProps) {
  const user = {
    id: "123",
    name: "Whermerson",
    email: "whermerson@gmail.com",
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
