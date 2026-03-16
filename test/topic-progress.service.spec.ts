import { beforeEach, describe, expect, it } from "vitest";

import { TopicProgressService } from "../src/services/topic-progress.service.js";
import { TopicProgress } from "../src/interfaces/topic-progress.interface.js";

class TestTopicProgressService extends TopicProgressService {
  constructor(data: TopicProgress[] | undefined) {
    super();
    this.mockData = data;
  }

  public callGetAll() {
    return this.getAll();
  }
}

describe("TopicProgressService", () => {
  let service: TestTopicProgressService;
  let mockData: TopicProgress[];
  beforeEach(() => {
    mockData = [
      {
        id: "p1",
        userId: "u1",
        topicId: "core-js",
        topicTitle: "Core JS",
        completedWidgetIds: ["w1", "w2"],
        percent: 66,
        updatedAt: "2026-02-22",
      },
      {
        id: "p2",
        userId: "u1",
        topicId: "algorithms",
        topicTitle: "Algorithms",
        completedWidgetIds: ["w4"],
        percent: 50,
        updatedAt: "2026-02-23",
      },
      {
        id: "p3",
        userId: "u2",
        topicId: "core-js",
        topicTitle: "Core JS",
        completedWidgetIds: ["w1"],
        percent: 33,
        updatedAt: "2026-02-22",
      },
    ];

    service = new TestTopicProgressService(mockData);
  });

  it("getTopicProgress should return all topic progress", async () => {
    const topicProgress = await service.getTopicProgress();
    expect(topicProgress).toHaveLength(mockData.length);
  });

  it("getTopicProgressByUserId should filter correctly for a random userId", async () => {
    const userIds = [
      ...new Set(mockData.map((topicProgress) => topicProgress.userId)),
    ];
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    if (randomUserId === undefined) {
      throw new Error("randomUserId is undefined");
    }

    const expectedTopicProgress = mockData.filter(
      (topicProgress) => topicProgress.userId === randomUserId,
    );

    const allTopicProgress =
      await service.getTopicProgressByUserId(randomUserId);

    expect(allTopicProgress).toHaveLength(expectedTopicProgress.length);
    expect(allTopicProgress).toStrictEqual(expectedTopicProgress);
  });

  it("getTopicProgressByTopicId should filter correctly for a random topicId", async () => {
    const topicIds = [
      ...new Set(mockData.map((topicProgress) => topicProgress.topicId)),
    ];
    const randomTopicId = topicIds[Math.floor(Math.random() * topicIds.length)];
    if (randomTopicId === undefined) {
      throw new Error("randomTopicId is undefined");
    }

    const expectedTopicProgress = mockData.filter(
      (topicProgress) => topicProgress.topicId === randomTopicId,
    );

    const allTopicProgress =
      await service.getTopicProgressByTopicId(randomTopicId);
    expect(allTopicProgress).toHaveLength(expectedTopicProgress.length);
    expect(allTopicProgress).toStrictEqual(expectedTopicProgress);
  });

  it("getAll should return undefined if mockData is invalid", async () => {
    const service = new TestTopicProgressService(undefined);
    const allTopicProgress = await service.callGetAll();
    expect(allTopicProgress).toBeUndefined();
  });
});
