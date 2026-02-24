export interface TopicProgress {
  topicProgressId: string;
  userId: string;
  completedWidgetIds: string[];
  percent: number;
  updatedAt: string;
  topicId: string;
  title: string;
  description: string;
  difficulty: number;
  tags: string[];
  widgetIds: string[];
}
