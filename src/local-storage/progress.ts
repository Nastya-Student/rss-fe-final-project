import { isTopicProgressArray } from "../guards/topic-progress.guards";
import { TopicProgress } from "../interfaces/topic-progress.interface";
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

export const setProgress = (progress: TopicProgress[]) => {
  localStorage.setItem(LOCAL_STORAGE.progress, JSON.stringify(progress));
};

export const updateProgress = () => {};

export const deleteProgress = () => {
  localStorage.removeItem(LOCAL_STORAGE.progress);
};
