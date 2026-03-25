import type { Progress } from "../api/progress.service";
import type { TopicProgress } from "../interfaces/topic-progress.interface";

export type Topic = {
  id: string;
  title: string;
  widgetIds: string[];
};

export const mapToTopicProgress = (
  topics: Topic[],
  progressList: Progress[],
): TopicProgress[] => {
  return topics.map((topic) => {
    const progress = progressList.find((p) => p.topic_id === topic.id);

    const completed = progress?.completed_widget_ids ?? [];

    const percent =
      topic.widgetIds.length === 0
        ? 0
        : Math.round((completed.length / topic.widgetIds.length) * 100);

    return {
      id: topic.id,
      userId: progress?.user_id ?? "",
      topicId: topic.id,
      topicTitle: topic.title,
      completedWidgetIds: completed,
      percent,
      updatedAt: progress?.updated_at ?? "",
    };
  });
};
