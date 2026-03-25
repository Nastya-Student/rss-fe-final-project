/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import { ACHIEVEMENTS } from "../constants.js";
import {
  checkGap,
  get2DifficultySuccess,
  get3DifficultySuccess,
  getLastAttempts,
  getLastSessions,
  getLastSuccessfulAttempts,
  getLastTrainingDaysData,
  getSuccessPercent,
  groupDataByDays,
} from "./get-achievements.js";

export const establishAchievementStatus = (
  sessions: PracticeSession[],
): string => {
  const data = groupDataByDays(sessions);
  const lastData = getLastTrainingDaysData(data);

  if (checkGap(lastData)) {
    return ACHIEVEMENTS.novice;
  }

  const lastSessions = getLastSessions(lastData);

  console.log(lastSessions);

  const lastAttempts = getLastAttempts(lastSessions);

  console.log(lastAttempts);

  const lastSuccessfulAttempts = getLastSuccessfulAttempts(lastSessions);

  console.log(lastSuccessfulAttempts);

  const lastSuccessPercent = getSuccessPercent(
    lastAttempts,
    lastSuccessfulAttempts,
  );

  console.log(lastSuccessPercent);

  const last2DifficultyPercent = get2DifficultySuccess(
    lastSessions,
    lastSuccessfulAttempts,
  );

  console.log(last2DifficultyPercent);

  const last3DifficultyPercent = get3DifficultySuccess(
    lastSessions,
    lastSuccessfulAttempts,
  );

  console.log(last3DifficultyPercent);

  if (
    lastSuccessfulAttempts >= 30 &&
    lastSuccessPercent >= 95 &&
    last2DifficultyPercent >= 40 &&
    last3DifficultyPercent >= 50
  ) {
    return ACHIEVEMENTS.expert;
  }

  if (
    lastSuccessfulAttempts >= 20 &&
    lastSuccessPercent >= 70 &&
    last2DifficultyPercent >= 30 &&
    last3DifficultyPercent >= 20
  ) {
    return ACHIEVEMENTS.topPerformer;
  }

  if (
    lastSuccessfulAttempts >= 10 &&
    lastSuccessPercent >= 50 &&
    last2DifficultyPercent >= 10
  ) {
    return ACHIEVEMENTS.student;
  }

  return ACHIEVEMENTS.novice;
};
