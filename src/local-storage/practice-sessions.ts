import { isPracticeSessionArray } from "../guards/practice-session.guards";
import { PracticeSession } from "../interfaces/practice-session.interface";
import { LOCAL_STORAGE } from "./objects";

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

export const getSessions = (): PracticeSession[] => {
  const sessions: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.userSessions) ?? "[]",
  );
  if (isPracticeSessionArray(sessions)) {
    return sessions;
  }
  return [];
};

export const deleteSessions = (): void => {};
