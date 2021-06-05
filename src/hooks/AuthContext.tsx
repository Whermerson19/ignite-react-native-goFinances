import * as Google from 'expo-google-app-auth';
import React, { createContext, useCallback, useContext, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage'


interface IUser {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContext {
  user: IUser;
  signInWithGoogle(): Promise<void>; 
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
  const [user, setUser] = useState<IUser>({} as IUser)

  const signInWithGoogle = useCallback(async() => {
    try {

      const result = await Google.logInAsync({
        iosClientId: '965121930231-f4b65go6rmfcla643mikpu5ssb6k26q3.apps.googleusercontent.com',
        androidClientId: '965121930231-cn70pfomvrc59i6qq1s3e5oael5st2in.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }
        setUser(userLogged)
        await AsyncStorage.setItem("@gofinances:user", JSON.stringify(userLogged))
      }


    } catch(err) {
      throw new Error((err)) 
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>{children}</AuthContext.Provider>
  );
}
