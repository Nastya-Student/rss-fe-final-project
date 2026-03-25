/* eslint-disable no-console */
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";

export const groupDataByDays = (
  sessions: PracticeSession[],
): Partial<Record<PropertyKey, PracticeSession[]>> => {
  const result = Object.groupBy(
    sessions,
    (session) => session.completedAt.split("T")[0] as PropertyKey,
  );
  console.log(result);
  return result;
};

// last 3 days sessions
export const getLastTrainingDaysData = (
  data: Partial<Record<PropertyKey, PracticeSession[]>>,
): [string, PracticeSession[] | undefined][] => {
  const result = Object.entries(data).slice(-3);
  return result;
};

export const getLastSessions = (
  data: [string, PracticeSession[] | undefined][],
): PracticeSession[] => {
  const result: PracticeSession[] = [];
  for (const element of data) {
    const item = element[1];
    if (item) {
      result.push(...item);
    }
  }
  return result;
};

export const checkGap = (
  data: [string, PracticeSession[] | undefined][],
): boolean => {
  const days: string[] = [];
  for (const element of data) {
    days.push(element[0]);
  }

  console.log(days);

  if (days[2] == undefined) {
    return true;
  }

  const startDay = new Date(days[2]); // should be replaced with the current day
  const period = 3;

  for (let i = period - 2; i >= 0; i--) {
    startDay.setDate(startDay.getDate() - 1);

    // console.log(startDay);

    const index = i;
    if (days[index] == undefined) {
      return true;
    }
    const prevDay = new Date(days[index]);

    // console.log(prevDay);

    if (startDay.getTime() !== prevDay.getTime()) {
      // console.log("not equal");
      return true;
    }
  }

  return false;
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
  return Math.round((correct / total) * 100);
};

export const countDifficulties = (
  sessions: PracticeSession[],
  difficulty: number,
): number => {
  let result = 0;
  for (const element of sessions) {
    for (const answer of element.answers) {
      if (!answer.isCorrect) {
        continue;
      }
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
  return Math.round(
    (countDifficulties(sessions, 1) / successfulAttempts) * 100,
  );
};

export const get2DifficultySuccess = (
  sessions: PracticeSession[],
  successfulAttempts: number,
): number => {
  return Math.round(
    (countDifficulties(sessions, 2) / successfulAttempts) * 100,
  );
};

export const get3DifficultySuccess = (
  sessions: PracticeSession[],
  successfulAttempts: number,
): number => {
  return Math.round(
    (countDifficulties(sessions, 3) / successfulAttempts) * 100,
  );
};
