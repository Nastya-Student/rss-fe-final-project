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

  if (currentUser) {
    setUser(currentUser);
  }

  return currentUser;
};

export const createPracticeHistory = async (
  userId: string,
): Promise<PracticeSession[] | undefined> => {
  const practiceHistory: PracticeSession[] | undefined =
    await practiceSessionService.getPracticeSessionsByUserId(userId);

  if (practiceHistory) {
    setSessions(practiceHistory);
  }

  return practiceHistory;
};

export const createProgress = async (
  userId: string,
): Promise<TopicProgress[] | undefined> => {
  const progress: TopicProgress[] | undefined =
    await topicProgressService.getTopicProgressByUserId(userId);
  if (progress) {
    setProgress(progress);
  }
  return progress;
};
