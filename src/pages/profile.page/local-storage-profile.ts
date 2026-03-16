import { isPracticeSessionArray } from "../../guards/practice-session.guards.js";
import { isUser } from "../../guards/user.guards.js";
import { PracticeSession } from "../../interfaces/practice-session.interface.js";
import { User } from "../../interfaces/user.interface.js";
import { LOCAL_STORAGE } from "./constants.js";

export const setUser = (user: User): void => {
  localStorage.setItem(LOCAL_STORAGE.currentUser, JSON.stringify(user) ?? "");
};

export const getUser = (): User | undefined => {
  const user: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.currentUser) ?? "{}",
  );
  if (isUser(user)) {
    return user;
  }
  return;
};

export const updateUser = (): void => {};

export const setSessions = (sessions: PracticeSession[]): void => {
  localStorage.setItem(
    LOCAL_STORAGE.userSessions,
    JSON.stringify(sessions) ?? "[]",
  );
};

export const addSession = (session: PracticeSession): void => {
  const sessions: PracticeSession[] = getSessions();
  sessions.push(session);
  setSessions(sessions);
};

// export const updateSession = (
//   sessionId: string,
// ): PracticeSession | undefined => {};

export const getSessions = (): PracticeSession[] => {
  const sessions: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.userSessions) ?? "[]",
  );
  if (isPracticeSessionArray(sessions)) {
    return sessions;
  }
  return [];
};
