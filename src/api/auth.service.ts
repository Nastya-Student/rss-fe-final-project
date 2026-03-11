import { supabase } from "./supabase";
import type { AuthResponse } from "@supabase/supabase-js";

export const register = async (
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

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const loginWithGoogle = async () => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const loginWithGithub = async () => {
  return supabase.auth.signInWithOAuth({
    provider: "github",
  });
};

export const logout = async () => {
  return supabase.auth.signOut();
};

export const getSession = async () => {
  return supabase.auth.getSession();
};
