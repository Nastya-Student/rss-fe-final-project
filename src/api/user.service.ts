import { supabase } from "./supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "../interfaces/user.interface";

type UserMetadata = {
  name?: string;
  full_name?: string;
};

const getUserName = (user: SupabaseUser): string => {
  const meta = user.user_metadata as UserMetadata;

  return meta?.name ?? meta?.full_name ?? user.email ?? "Anonymous";
};

export const getCurrentUser = async (): Promise<SupabaseUser | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const ensureMyProfile = async (): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        name: getUserName(user),
      },
      { onConflict: "id" },
    )
    .select()
    .single<User>();

  if (error) throw error;

  return data;
};

export const getMyProfile = async (): Promise<User | undefined> => {
  const user = await getCurrentUser();
  if (!user) return undefined;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle<User>();

  if (error) throw error;

  return data ?? undefined;
};

export const updateProfile = async (
  updates: Partial<Pick<User, "name" | "xp" | "streak">>,
): Promise<User> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select()
    .single<User>();

  if (error) throw error;

  return data;
};

export const getCurrentUserWithProfile = async (): Promise<User> => {
  return await ensureMyProfile();
};
