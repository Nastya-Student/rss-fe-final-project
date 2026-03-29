import { isPracticeSession } from "../guards/practice-session.guards";
import { PracticeSession } from "../interfaces/practice-session.interface";
import { SessionAnswer } from "../interfaces/session-answer.interface";
import { LOCAL_STORAGE } from "./objects";

export const setSession = (session: PracticeSession) => {
  localStorage.setItem(LOCAL_STORAGE.currentSession, JSON.stringify(session));
};

export const getSession = (): PracticeSession => {
  const session: unknown = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE.currentSession) ?? "",
  );
  if (isPracticeSession(session)) {
    return session;
  }
  throw new Error("please, create a local session first");
};

export const updateSession = (answer: SessionAnswer): void => {
  const session = getSession();
  session.answers.push(answer);
  setSession(session);
};

export const deleteSession = (): void => {
  localStorage.removeItem(LOCAL_STORAGE.currentSession);
};
