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

  const lastAttempts = getLastAttempts(lastSessions);

  const lastSuccessfulAttempts = getLastSuccessfulAttempts(lastSessions);

  const lastSuccessPercent = getSuccessPercent(
    lastAttempts,
    lastSuccessfulAttempts,
  );

  const last2DifficultyPercent = get2DifficultySuccess(
    lastSessions,
    lastSuccessfulAttempts,
  );

  const last3DifficultyPercent = get3DifficultySuccess(
    lastSessions,
    lastSuccessfulAttempts,
  );

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
