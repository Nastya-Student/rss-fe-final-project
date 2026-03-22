import { supabase } from "./supabase";
import type {
  AuthResponse,
  AuthTokenResponsePassword,
  AuthSession,
  OAuthResponse,
} from "@supabase/supabase-js";

export const register = (
  email: string,
  password: string,
  name: string,
): Promise<AuthResponse> => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
};

export const login = (
  email: string,
  password: string,
): Promise<AuthTokenResponsePassword> => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const loginWithGoogle = (): Promise<OAuthResponse> => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const loginWithGithub = (): Promise<OAuthResponse> => {
  return supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

export const logout = (): Promise<{ error: Error | null }> => {
  return supabase.auth.signOut();
};

export const getSession = (): Promise<{
  data: { session: AuthSession | null };
  error: Error | null;
}> => {
  return supabase.auth.getSession();
};
