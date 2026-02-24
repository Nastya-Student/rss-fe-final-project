export interface TopicProgress {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  completedWidgetIds: string[];
  percent: number;
  updatedAt: string;
}
