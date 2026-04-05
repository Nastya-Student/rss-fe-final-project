import { isTopicProgressArray } from "../guards/topic-progress.guards";
import { PracticeSession } from "../interfaces/practice-session.interface";
import { TopicProgress } from "../interfaces/topic-progress.interface";
import { getSession } from "./current-session";
import { LOCAL_STORAGE } from "./objects";

export const getProgress = (): TopicProgress[] => {
  const progress: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.progress) ?? "[]",
  );
  if (isTopicProgressArray(progress)) {
    return progress;
  }
  return [];
};

export const setProgress = (progress: TopicProgress[]): void => {
  localStorage.setItem(LOCAL_STORAGE.progress, JSON.stringify(progress));
};

export const updateProgress = (): void => {
  const session = getSession();
  if (!session) {
    return;
  }
  const progressList = getProgress();
  let progress = progressList.find((item) => item.topicId === session.topicId);
  if (progress === undefined) {
    progress = createNewProgress(session);
  }
  const completedWidgets = session.answers.map((item) => item.widgetId);
  progress.completedWidgetIds = completedWidgets;
  progress.percent = Math.round(completedWidgets.length / 10);
  progress.updatedAt = session.completedAt.split("T")[0] ?? "";

  const newProgressList = progressList.filter(
    (item) => item.id !== progress.id,
  );
  newProgressList.push(progress);
  setProgress(newProgressList);
};

export const deleteProgress = (): void => {
  localStorage.removeItem(LOCAL_STORAGE.progress);
};

export const createNewProgress = (session: PracticeSession): TopicProgress => {
  return {
    id: getProgress().length.toString(),
    userId: session.userId,
    topicId: session.topicId,
    topicTitle: session.topicTitle,
    completedWidgetIds: [],
    percent: 0,
    updatedAt: "",
  };
};
