import type { BaseWidget } from "../interfaces/base-widget.interface.js";
import { API_BASE_URL, isMockData } from "../config/api.config.js";
import widgetsMock from "../data/mock-widgets.data.json" with { type: "json" };
import { isBaseWidgetArray } from "../guards/base-widget.guards.js";

class WidgetService {
  async getWidgets(): Promise<BaseWidget[] | undefined> {
    if (isMockData()) {
      const data: unknown = widgetsMock;

      if (isBaseWidgetArray(data)) {
        return data;
      }

      return;
    }

    return fetch(`${API_BASE_URL}/widgets`)
      .then((response) => response.json())
      .then((data) => {
        if (isBaseWidgetArray(data)) {
          return data;
        }

        return;
      });
  }

  async getWidgetsByTopicId(
    topicId: string,
  ): Promise<BaseWidget[] | undefined> {
    const widgets = await this.getWidgets();
    return widgets?.filter((widget) => widget.topicId === topicId);
  }
}

export const widgetService = new WidgetService();
