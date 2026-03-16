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
});
