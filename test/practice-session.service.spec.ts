import { beforeEach, describe, expect, it } from "vitest";
import { PracticeSession } from "../src/interfaces/practice-session.interface.js";
import { PracticeSessionService } from "../src/services/practice-session.service.js";

class TestPracticeSessionService extends PracticeSessionService {
  constructor(data: PracticeSession[]) {
    super();
    this.mockData = data;
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
});
