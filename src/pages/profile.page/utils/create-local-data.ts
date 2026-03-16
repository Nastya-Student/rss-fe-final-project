/* eslint-disable no-console */
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import { User } from "../../../interfaces/user.interface.js";
import { practiceSessionService } from "../../../services/practice-session.service.js";
import { userService } from "../../../services/user.service.js";

export const createLocalUser = async (
  userId: string,
): Promise<User | undefined> => {
  const currentUser: User | undefined = await userService.getUserById(userId);

  localStorage.setItem("current-user", JSON.stringify(currentUser) ?? "");
  console.log(currentUser);
  return currentUser;
};

export const createPracticeHistory = async (
  userId: string,
): Promise<PracticeSession[] | undefined> => {
  const practiceHistory: PracticeSession[] | undefined =
    await practiceSessionService.getPracticeSessionsByUserId(userId);

  localStorage.setItem("practice-history", JSON.stringify(practiceHistory));
  console.log(practiceHistory);
  return practiceHistory;
};
