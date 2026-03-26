import { supabase } from "./supabase";
import type {
  AuthError,
  AuthSession,
  OAuthResponse,
} from "@supabase/supabase-js";

type AuthResult<T> = {
  data: T | undefined;
  error: AuthError | undefined;
};

export const register = async (
  email: string,
  password: string,
  name: string,
): Promise<AuthResult<AuthSession>> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error !== null) {
    return { data: undefined, error };
  }

  return {
    data: data.session ?? undefined,
    error: undefined,
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResult<AuthSession>> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error !== null) {
    return { data: undefined, error };
  }

  return {
    data: data.session ?? undefined,
    error: undefined,
  };
};

export const loginWithGoogle = async (): Promise<
  AuthResult<OAuthResponse["data"]>
> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error !== null) {
    return { data: undefined, error };
  }

  return {
    data,
    error: undefined,
  };
};

export const loginWithGithub = async (): Promise<
  AuthResult<OAuthResponse["data"]>
> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error !== null) {
    return { data: undefined, error };
  }

  return {
    data,
    error: undefined,
  };
};

export const logout = async (): Promise<{ error: AuthError | undefined }> => {
  const { error } = await supabase.auth.signOut();

  if (error !== null) {
    return { error };
  }

  return { error: undefined };
};

export const getSession = async (): Promise<AuthResult<AuthSession>> => {
  const { data, error } = await supabase.auth.getSession();

  if (error !== null) {
    return { data: undefined, error };
  }

  return {
    data: data.session ?? undefined,
    error: undefined,
  };
};

export const onAuthChange = (
  callback: (session: AuthSession | undefined) => void,
) => {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ?? undefined);
  });

  return data.subscription;
};

export const resetPassword = async (
  email: string,
): Promise<{ error: unknown }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/#/update-password`,
  });

  return { error };
};

export const updatePassword = async (
  password: string,
): Promise<{ error: AuthError | undefined }> => {
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error !== null) {
    return { error };
  }

  return { error: undefined };
};
