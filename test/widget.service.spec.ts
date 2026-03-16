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
});
