import { PracticeSession } from "../interfaces/practice-session.interface.js";
import { TopicProgress } from "../interfaces/topic-progress.interface.js";
import { User } from "../interfaces/user.interface.js";
import { setSessions } from "./practice-sessions.js";
import { setProgress } from "./progress.js";
import { setUser } from "./user.js";
import { practiceSessionService } from "../services/practice-session.service.js";
import { topicProgressService } from "../services/topic-progress.service.js";
import { userService } from "../services/user.service.js";

export const createLocalUser = async (
  userId: string,
): Promise<User | undefined> => {
  const currentUser: User | undefined = await userService.getUserById(userId);

  if (!currentUser) {
    throw new Error("user can not be found");
  }
  setUser(currentUser);
  return currentUser;
};

export const createPracticeHistory = async (
  userId: string,
): Promise<PracticeSession[] | undefined> => {
  const practiceHistory: PracticeSession[] | undefined =
    await practiceSessionService.getPracticeSessionsByUserId(userId);

  if (!practiceHistory) {
    throw new Error("practice history can not be found");
  }
  setSessions(practiceHistory);
  return practiceHistory;
};

export const createProgress = async (
  userId: string,
): Promise<TopicProgress[] | undefined> => {
  const progress: TopicProgress[] | undefined =
    await topicProgressService.getTopicProgressByUserId(userId);
  if (!progress) {
    throw new Error("progress can not be found");
  }
  setProgress(progress);
  return progress;
};
