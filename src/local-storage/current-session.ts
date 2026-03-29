import { isPracticeSession } from "../guards/practice-session.guards";
import { PracticeSession } from "../interfaces/practice-session.interface";
import { SessionAnswer } from "../interfaces/session-answer.interface";
import { LOCAL_STORAGE } from "./objects";

export const setSession = (session: PracticeSession) => {
  localStorage.setItem(LOCAL_STORAGE.currentSession, JSON.stringify(session));
};

export const getSession = (): PracticeSession | undefined => {
  const session: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.currentSession) ?? "",
  );
  if (isPracticeSession(session)) {
    return session;
  }
  // throw new Error("please, create a local session first");
  return undefined;
};

export const updateSession = (
  answer: SessionAnswer,
  score: number,
  newDate: string,
): void => {
  const session = getSession();
  if (session === undefined) {
    throw new Error("please, create a local session first");
  }
  session.answers.push(answer);
  session.score += score;
  session.completedAt = newDate;
  setSession(session);
};

export const deleteSession = (): void => {
  localStorage.removeItem(LOCAL_STORAGE.currentSession);
};
