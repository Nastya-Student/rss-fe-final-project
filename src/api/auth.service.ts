import { supabase } from "./supabase";
import type {
  AuthResponse,
  AuthSession,
  AuthError,
  OAuthResponse,
} from "@supabase/supabase-js";

export const register = async (
  email: string,
  password: string,
  name: string,
): Promise<{ data: AuthResponse["data"]; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  return { data, error };
};

export const login = async (
  email: string,
  password: string,
): Promise<{ session: AuthSession | null; error: AuthError | null }> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { session: data.session, error };
};

export const loginWithGoogle = async (): Promise<{
  data: OAuthResponse["data"];
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  return { data, error };
};

export const loginWithGithub = async (): Promise<{
  data: OAuthResponse["data"];
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  return { data, error };
};

export const logout = async (): Promise<{ error: AuthError | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getSession = async (): Promise<{
  session: AuthSession | null;
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

export const getUser = async (): Promise<{
  user: AuthSession["user"] | null;
  error: AuthError | null;
}> => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export const onAuthChange = (
  callback: (session: AuthSession | null) => void,
) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
};
