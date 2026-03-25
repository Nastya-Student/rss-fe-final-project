import { supabase } from "./supabase";
import { getCurrentUser } from "./user.service";

export type Progress = {
  id: string;
  user_id: string;
  topic_id: string;
  completed_widget_ids: string[];
  updated_at: string;
};

type ProgressRow = {
  id: string;
  user_id: string;
  topic_id: string;
  completed_widget_ids: unknown;
  updated_at: string;
};

export const addWidgetProgress = async (
  topicId: string,
  widgetId: string,
): Promise<Progress> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data: existing, error: fetchError } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .maybeSingle<ProgressRow>();

  if (fetchError) throw fetchError;

  const current = Array.isArray(existing?.completed_widget_ids)
    ? existing.completed_widget_ids.map(String)
    : [];

  const updated = [...new Set([...current, widgetId])];

  const { data, error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: user.id,
        topic_id: topicId,
        completed_widget_ids: updated,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id,topic_id",
      },
    )
    .select()
    .maybeSingle<ProgressRow>();

  if (error) throw error;
  if (!data) throw new Error("No data returned");

  return {
    id: data.id,
    user_id: data.user_id,
    topic_id: data.topic_id,
    completed_widget_ids: Array.isArray(data.completed_widget_ids)
      ? data.completed_widget_ids.map(String)
      : [],
    updated_at: data.updated_at,
  };
};

export const getMyProgress = async (): Promise<Progress[]> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .overrideTypes<ProgressRow[]>();

  if (error) throw error;

  return (data ?? []).map((item) => ({
    id: item.id,
    user_id: item.user_id,
    topic_id: item.topic_id,
    completed_widget_ids: Array.isArray(item.completed_widget_ids)
      ? item.completed_widget_ids.map(String)
      : [],
    updated_at: item.updated_at,
  }));
};

export const getTopicProgress = async (
  topicId: string,
): Promise<Progress | undefined> => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .maybeSingle<ProgressRow>();

  if (error) throw error;
  if (!data) return undefined;

  return {
    id: data.id,
    user_id: data.user_id,
    topic_id: data.topic_id,
    completed_widget_ids: Array.isArray(data.completed_widget_ids)
      ? data.completed_widget_ids.map(String)
      : [],
    updated_at: data.updated_at,
  };
};
