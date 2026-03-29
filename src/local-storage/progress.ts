import { TopicProgress } from "../interfaces/topic-progress.interface";
import { LOCAL_STORAGE } from "./objects";

export const getProgress = () => {};

export const setProgress = (progress: TopicProgress[]) => {
  localStorage.setItem(
    LOCAL_STORAGE.progress,
    JSON.stringify(progress) ?? "[]",
  );
};

export const updateProgress = () => {};

export const deleteProgress = () => {};
