import { beforeEach, describe, expect, it } from "vitest";
import { PracticeSession } from "../src/interfaces/practice-session.interface.js";
import { PracticeSessionService } from "../src/services/practice-session.service.js";

class TestPracticeSessionService extends PracticeSessionService {
  constructor(data: PracticeSession[] | undefined) {
    super();
    this.mockData = data;
  }

  public callGetAll() {
    return this.getAll();
  }
}

describe("PracticeSessionService", () => {
  let service: TestPracticeSessionService;
  let mockData: PracticeSession[];

  beforeEach(() => {
    mockData = [
      {
        id: "s1",
        userId: "u1",
        topicId: "core-js",
        topicTitle: "Core JS",
        answers: [
          { widgetId: "w1", isCorrect: true, timeSpent: 12 },
          { widgetId: "w2", isCorrect: true, timeSpent: 8 },
        ],
        score: 85,
        startedAt: "2026-02-22T10:00:00",
        completedAt: "2026-02-22T10:10:00",
      },
      {
        id: "s2",
        userId: "u1",
        topicId: "algorithms",
        topicTitle: "Algorithms",
        answers: [{ widgetId: "w4", isCorrect: true, timeSpent: 20 }],
        score: 70,
        startedAt: "2026-02-23T11:00:00",
        completedAt: "2026-02-23T11:15:00",
      },
      {
        id: "s3",
        userId: "u2",
        topicId: "core-js",
        topicTitle: "Core JS",
        answers: [{ widgetId: "w1", isCorrect: false, timeSpent: 15 }],
        score: 0,
        startedAt: "2026-02-22T12:00:00",
        completedAt: "2026-02-22T12:05:00",
      },
    ];

    service = new TestPracticeSessionService(mockData);
  });

  it("getPracticeSessions should return all sessions", async () => {
    const sessions = await service.getPracticeSessions();
    expect(sessions).toHaveLength(mockData.length);
  });

  it("getPracticeSessionsByUserId should filter correctly for a random userId", async () => {
    const userIds = [...new Set(mockData.map((session) => session.userId))];
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    if (randomUserId === undefined) {
      throw new Error("randomUserId is undefined");
    }

    const expectedSessions = mockData.filter(
      (session) => session.userId === randomUserId,
    );

    const sessions = await service.getPracticeSessionsByUserId(randomUserId);

    expect(sessions).toHaveLength(expectedSessions.length);
    expect(sessions).toStrictEqual(expectedSessions);
  });

  it("getPracticeSessionsByTopicId should filter correctly for a random topicId", async () => {
    const topicIds = [...new Set(mockData.map((session) => session.topicId))];
    const randomTopicId = topicIds[Math.floor(Math.random() * topicIds.length)];
    if (randomTopicId === undefined) {
      throw new Error("randomTopicId is undefined");
    }

    const expectedSessions = mockData.filter(
      (session) => session.topicId === randomTopicId,
    );

    const sessions = await service.getPracticeSessionsByTopicId(randomTopicId);
    expect(sessions).toHaveLength(expectedSessions.length);
    expect(sessions).toStrictEqual(expectedSessions);
  });

  it("getAll should return undefined if mockData is invalid", async () => {
    const service = new TestPracticeSessionService(undefined);
    const sessions = await service.callGetAll();
    expect(sessions).toBeUndefined();
  });
});
