import { beforeEach, describe, expect, it } from "vitest";
import { WidgetService } from "../src/services/widget.service.js";
import { Widget } from "../src/types/widget.type.js";

class TestWidgetService extends WidgetService {
  constructor(data: Widget[] | undefined) {
    super();
    this.mockData = data;
  }

  public callGetAll() {
    return this.getAll();
  }
}

describe("WidgetService", () => {
  let service: TestWidgetService;
  let mockData: Widget[];
  beforeEach(() => {
    mockData = [
      {
        id: "w1",
        topicId: "coreJS",
        type: "quiz",
        difficulty: 1,
        tags: ["coreJS"],
        payload: {
          title: "typeof null",
          question: "Что вернет typeof null?",
          options: ["null", "undefined", "object", "NaN"],
          correctIndex: 2,
        },
      },
      {
        id: "w2",
        topicId: "coreJS",
        type: "true-false",
        difficulty: 1,
        tags: ["coreJS"],
        payload: {
          title: "Promise.all order",
          statement: "Promise.all возвращает результаты в порядке завершения",
          correct: false,
          explanation: "Порядок сохраняется как во входном массиве",
        },
      },
      {
        id: "w3",
        topicId: "typescript",
        type: "code-completion",
        difficulty: 1,
        tags: ["typescript"],
        payload: {
          title: "Filter Array",
          code: "const positive = arr.___(x => x > 0);",
          blanks: ["___"],
          correctAnswers: ["filter"],
        },
      },
    ];

    service = new TestWidgetService(mockData);
  });

  it("getWidgets should return all widgets", async () => {
    const widgets = await service.getWidgets();
    expect(widgets).toHaveLength(mockData.length);
  });

  it("getWidgetsByTopicId should filter correctly for a random topicId", async () => {
    const topicIds = [
      ...new Set(mockData.map((topicProgress) => topicProgress.topicId)),
    ];
    const randomTopicId = topicIds[Math.floor(Math.random() * topicIds.length)];
    if (randomTopicId === undefined) {
      throw new Error("randomTopicId is undefined");
    }

    const expectedWidgets = mockData.filter(
      (widget) => widget.topicId === randomTopicId,
    );

    const widgets = await service.getWidgetsByTopicId(randomTopicId);
    expect(widgets).toHaveLength(expectedWidgets.length);
    expect(widgets).toStrictEqual(expectedWidgets);
  });

  it("getAll should return undefined if mockData is invalid", async () => {
    const service = new TestWidgetService(undefined);
    const allTopicProgress = await service.callGetAll();
    expect(allTopicProgress).toBeUndefined();
  });
});
