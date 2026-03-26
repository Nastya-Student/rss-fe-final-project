import { supabase } from "./supabase";
import { getCurrentUserId } from "./user.service";
import type { TopicProgress } from "../interfaces/topic-progress.interface";

type CompletedRow = {
  topic_id: string;
  widget_id: string;
};

type ProgressRow = {
  id: string;
  topic_id: string;
  updated_at: string;
};

type Topic = {
  id: string;
  title: string;
  widgetIds: string[];
};

export const getTopicProgressList = async (
  topics: Topic[],
): Promise<TopicProgress[]> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) throw new Error("Not authenticated");

  const { data: completed, error: completedError } = await supabase
    .from("completed_widgets")
    .select("topic_id, widget_id")
    .eq("user_id", userId)
    .overrideTypes<CompletedRow[]>();

  if (completedError !== null) throw completedError;

  const { data: progressRows, error: progressError } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .overrideTypes<ProgressRow[]>();

  if (progressError !== null) throw progressError;

  const completedMap = new Map<string, string[]>();

  for (const row of completed ?? []) {
    const list = completedMap.get(row.topic_id);

    if (list === undefined) {
      completedMap.set(row.topic_id, [row.widget_id]);
      continue;
    }

    list.push(row.widget_id);
  }

  const progressMap = new Map<string, ProgressRow>();

  for (const row of progressRows ?? []) {
    progressMap.set(row.topic_id, row);
  }

  const result: TopicProgress[] = [];

  for (const topic of topics) {
    const completedIds = completedMap.get(topic.id) ?? [];
    const total = topic.widgetIds.length;

    const percent =
      total === 0 ? 0 : Math.round((completedIds.length / total) * 100);

    const progressRow = progressMap.get(topic.id);

    result.push({
      id: progressRow?.id ?? `${userId}_${topic.id}`,
      userId,
      topicId: topic.id,
      topicTitle: topic.title,
      completedWidgetIds: completedIds,
      percent,
      updatedAt: progressRow?.updated_at ?? new Date().toISOString(),
    });
  }

  return result;
};
