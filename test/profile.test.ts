/* eslint-disable no-console */
import { isPracticeSessionArray } from "../src/guards/practice-session.guards.js";
import { PracticeSession } from "../src/interfaces/practice-session.interface.js";
import { establishAchievementStatus } from "../src/pages/profile.page/utils/establish-achievement-status.js";
import sessionsTestData1 from "./profile-test-data/profile-test-data-1.json" with { type: "json" };
import sessionsTestData2 from "./profile-test-data/profile-test-data-2.json" with { type: "json" };
import sessionsTestData3 from "./profile-test-data/profile-test-data-3.json" with { type: "json" };
import sessionsTestData4 from "./profile-test-data/profile-test-data-4.json" with { type: "json" };
import sessionsTestData5 from "./profile-test-data/profile-test-data-5.json" with { type: "json" };
import sessionsTestData6 from "./profile-test-data/profile-test-data-6.json" with { type: "json" };

import { expect, test } from "vitest";

test("number of success is not enough for 'student'", () => {
  const sessions: PracticeSession[] = isPracticeSessionArray(sessionsTestData1)
    ? sessionsTestData1
    : [];

  const status = establishAchievementStatus(sessions);
  expect(status).toBe("novice");
});

test("percent of success is not enough for 'student'", () => {
  const sessions2: PracticeSession[] = isPracticeSessionArray(sessionsTestData2)
    ? sessionsTestData2
    : [];

  const status = establishAchievementStatus(sessions2);
  expect(status).toBe("novice");
});

test("percent of success with difficulty 2 is not enough for 'student'", () => {
  const sessions: PracticeSession[] = isPracticeSessionArray(sessionsTestData3)
    ? sessionsTestData3
    : [];

  const status = establishAchievementStatus(sessions);
  expect(status).toBe("novice");
});

test("the conditions for achievement 'student' are met", () => {
  const sessions: PracticeSession[] = isPracticeSessionArray(sessionsTestData4)
    ? sessionsTestData4
    : [];

  const status = establishAchievementStatus(sessions);
  expect(status).toBe("student");
});

test("the conditions for achievement 'top-performer' are met", () => {
  const sessions: PracticeSession[] = isPracticeSessionArray(sessionsTestData5)
    ? sessionsTestData5
    : [];

  const status = establishAchievementStatus(sessions);
  expect(status).toBe("top-performer");
});

test("the conditions for achievement 'expert' are met", () => {
  const sessions: PracticeSession[] = isPracticeSessionArray(sessionsTestData6)
    ? sessionsTestData6
    : [];

  const status = establishAchievementStatus(sessions);
  expect(status).toBe("novice");
});
