import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import { User } from "../../../interfaces/user.interface.js";
import { setSessions } from "../../../local-storage/practice-sessions.js";
import { setUser } from "../../../local-storage/user.js";
import { practiceSessionService } from "../../../services/practice-session.service.js";
import { userService } from "../../../services/user.service.js";

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
