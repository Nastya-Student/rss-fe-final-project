import { supabase } from "./supabase";
import type { User } from "../interfaces/user.interface";

type ProfileRow = {
  id: string;
  name: string;
  photo: string;
  xp: number;
  streak: number;
  get_reminder: boolean;
  created_at: string;
};

const mapProfile = (row: ProfileRow): User => ({
  id: row.id,
  name: row.name,
  photo: row.photo,
  xp: row.xp,
  streak: row.streak,
  getReminder: row.get_reminder,
  createdAt: row.created_at,
});

export const getCurrentUserId = async (): Promise<string | undefined> => {
  const { data, error } = await supabase.auth.getUser();

  if (error !== null) throw error;

  return data.user?.id ?? undefined;
};

export const getMyProfile = async (): Promise<User | undefined> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) return undefined;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single<ProfileRow>();

  if (error !== null) throw error;

  return mapProfile(data);
};

export const updateProfile = async (
  updates: Partial<Omit<User, "id" | "createdAt">>,
): Promise<User> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) throw new Error("Not authenticated");

  const payload: Partial<ProfileRow> = {};

  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.photo !== undefined) payload.photo = updates.photo;
  if (updates.xp !== undefined) payload.xp = updates.xp;
  if (updates.streak !== undefined) payload.streak = updates.streak;
  if (updates.getReminder !== undefined) {
    payload.get_reminder = updates.getReminder;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select()
    .single<ProfileRow>();

  if (error !== null) throw error;

  return mapProfile(data);
};

export const addXp = async (amount: number): Promise<User> => {
  const profile = await getMyProfile();
  if (profile === undefined) throw new Error("No profile");

  return updateProfile({
    xp: profile.xp + amount,
  });
};

export const incrementStreak = async (): Promise<User> => {
  const profile = await getMyProfile();
  if (profile === undefined) throw new Error("No profile");

  return updateProfile({
    streak: profile.streak + 1,
  });
};

export const resetStreak = async (): Promise<User> => {
  return updateProfile({
    streak: 0,
  });
};
