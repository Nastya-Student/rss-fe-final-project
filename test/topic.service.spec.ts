import { beforeEach, describe, expect, it } from "vitest";
import { Topic } from "../src/interfaces/topic.interface.js";
import { TopicService } from "../src/services/topic.service.js";

class TestTopicService extends TopicService {
  constructor(data: Topic[] | undefined) {
    super();
    this.mockData = data;
  }

  public callGetAll() {
    return this.getAll();
  }
}

describe("TopicProgressService", () => {
  let service: TestTopicService;
  let mockData: Topic[];
  beforeEach(() => {
    mockData = [
      {
        id: "core-js",
        title: "Core JS",
        description: "Замыкания, event loop, this",
        difficulty: 3,
        tags: ["js", "core"],
        widgetIds: ["w1", "w2", "w3"],
      },
      {
        id: "algorithms",
        title: "Algorithms",
        description: "Сортировки, рекурсия",
        difficulty: 4,
        tags: ["algo"],
        widgetIds: ["w4", "w5"],
      },
      {
        id: "typescript",
        title: "TypeScript",
        description: "Типы, generics, utility types",
        difficulty: 3,
        tags: ["ts"],
        widgetIds: ["w6", "w7"],
      },
    ];

    service = new TestTopicService(mockData);
  });

  it("getTopics should return all topics", async () => {
    const topics = await service.getTopics();
    expect(topics).toHaveLength(mockData.length);
  });
});
