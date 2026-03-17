import { PracticeSession } from "../../../interfaces/practice-session.interface.js";

export const getLastContinuousDuration = (): number => {
  return 0;
};

export const groupDataByDays = (id: string) => {
  return id;
};

export const getLastTrainingDaysData = (sessions: PracticeSession[]) => {
  return sessions.slice(-5);
};

export const getLastAttempts = (sessions: PracticeSession[]): number => {
  let attempts = 0;
  for (const element of sessions) {
    attempts += element.answers.length;
  }
  return attempts;
};

export const getLastSuccessfulAttempts = (
  sessions: PracticeSession[],
): number => {
  let result = 0;
  for (const element of sessions) {
    for (const answer of element.answers) {
      if (answer.isCorrect) {
        result++;
      }
    }
  }
  return result;
};

export const getSuccessPercent = (total: number, correct: number): number => {
  return (correct / total) * 100;
};

export const countDifficulties = (
  sessions: PracticeSession[],
  difficulty: number,
): number => {
  let result = 0;
  for (const element of sessions) {
    for (const answer of element.answers) {
      if (answer.difficulty === difficulty) {
        result += 1;
      }
    }
  }
  return result;
};

export const get1DifficultySuccess = (
  sessions: PracticeSession[],
  successfulAttempts: number,
): number => {
  return (countDifficulties(sessions, 1) / successfulAttempts) * 100;
};

export const get2DifficultySuccess = (
  sessions: PracticeSession[],
  successfulAttempts: number,
): number => {
  return (countDifficulties(sessions, 2) / successfulAttempts) * 100;
};

export const get3DifficultySuccess = (
  sessions: PracticeSession[],
  successfulAttempts: number,
): number => {
  return (countDifficulties(sessions, 3) / successfulAttempts) * 100;
};
