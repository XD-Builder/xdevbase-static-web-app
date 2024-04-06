"use client";

import React, {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { type Session, type User } from "@supabase/supabase-js";
import { supabase } from '@/server/supabase/supabaseClient'

export const AuthContext = createContext<{
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}>({
  user: null,
  session: null,
  isLoading: false,
});

const setCookies = (session: Session | null) => {
  if (session) {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires

    document.cookie = `access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
    document.cookie = `refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
  } else {
    const expires = new Date(0).toUTCString();

    document.cookie = `access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
  }
};

/**
 * Create a new AuthProvider component that uses the current user session.
 * It will first set the user, session and loading state to the initial values.
 * It will also refresh session and listen for state changes.
 * For every re-render of this or its parent components due to props or states
 * changes, the cleanup and set up code will provide a new user session.
 * The Auth context provider will then provide those values to all children
 * through useContext(AuthContext) call, which is convenient for wrapped
 * through {@link useUser} hook.
 *  
 * For more, see https://react.dev/reference/react/useEffect
 * Note: all of the below code are executed on the client side. The sessions are passed
 * in for the first time when the server renders and the auth state changes are listened.
 * This means that if a user is logged, the auth state will change and the listener will
 * execute, leading to a new session, cookie and user being set. 
 */
export const AuthProvider = ({
  user: initialUser,
  session: initialSession,
  children,
}: {
  user: User | null;
  session: Session | null;
  children: ReactNode;
}) => {
  const [userSession, setUserSession] = useState<Session | null>(
    initialSession,
  );
  const [user, setUser] = useState<User | null>(initialUser);
  const [isLoading, setIsLoading] = useState(!initialUser);

  useEffect(() => {
    const client = supabase();

    // If the 
    void client 
      .auth.getSession()
      .then(({ data: { session } }) => {
        setUserSession(session);
        setUser(session?.user ?? null);
        setCookies(session);
        setIsLoading(false);
      });

    const { data: authListener } = client.auth.onAuthStateChange(
      (_event, session) => {
        setUserSession(session);
        setUser(session?.user ?? null);
        setCookies(session);
        setIsLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session: userSession,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a AuthContextProvider.");
  }

  return context;
};
