export interface TopicProgress {
  id: string;
  userId: string;
  topicId: string;
  completedWidgetIds: string[];
  percent: number;
  updatedAt: string;
}
