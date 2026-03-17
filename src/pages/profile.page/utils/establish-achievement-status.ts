/* eslint-disable @typescript-eslint/no-unused-vars */
import { PracticeSession } from "../../../interfaces/practice-session.interface.js";
import { ACHIEVEMENTS } from "../constants.js";
import {
  // get1DifficultySuccess,
  get2DifficultySuccess,
  get3DifficultySuccess,
  getLastAttempts,
  getLastContinuousDuration,
  getLastSuccessfulAttempts,
  getLastTrainingDaysData,
  getSuccessPercent,
} from "./get-achievements.js";

export const establishAchievementStatus = (
  sessions: PracticeSession[],
): string => {
  // const lastContinuousDuration = getLastContinuousDuration();
  const lastContinuousDuration = 15; // 15 sessions, but should be 15 days
  if (lastContinuousDuration < 3) {
    return ACHIEVEMENTS.novice;
  }

  const data = getLastTrainingDaysData(sessions);

  const lastAttempts = getLastAttempts(sessions);
  const lastSuccessfulAttempts = getLastSuccessfulAttempts(sessions);
  const lastSuccessPercent = getSuccessPercent(
    lastAttempts,
    lastSuccessfulAttempts,
  );

  // const last1DPercent = get1DifficultySuccess();
  const last2DPercent = get2DifficultySuccess(sessions, lastSuccessfulAttempts);
  const last3DPercent = get3DifficultySuccess(sessions, lastSuccessfulAttempts);

  if (
    lastSuccessfulAttempts >= 30 &&
    lastSuccessPercent >= 95 &&
    last2DPercent >= 40 &&
    last3DPercent >= 50
  ) {
    return ACHIEVEMENTS.expert;
  }

  if (
    lastSuccessfulAttempts >= 20 &&
    lastSuccessPercent >= 70 &&
    last2DPercent >= 30 &&
    last3DPercent >= 20
  ) {
    return ACHIEVEMENTS.topPerformer;
  }

  if (
    lastSuccessfulAttempts >= 10 &&
    lastSuccessPercent >= 50 &&
    last2DPercent >= 10
  ) {
    return ACHIEVEMENTS.student;
  }

  return ACHIEVEMENTS.novice;
};
