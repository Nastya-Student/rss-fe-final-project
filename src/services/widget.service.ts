import type { BaseWidget } from "../interfaces/base-widget.interface.js";
import widgetsMock from "../data/mock-widgets.data.json" with { type: "json" };
import { isBaseWidgetArray } from "../guards/base-widget.guards.js";
import { BaseDataService } from "./base-data.service.js";

class WidgetService extends BaseDataService<BaseWidget> {
  protected endpoint = "users";
  protected mockData: unknown = widgetsMock;
  protected isValid = isBaseWidgetArray;

  async getWidgets(): Promise<BaseWidget[] | undefined> {
    return this.getAll();
  }

  async getWidgetsByTopicId(
    topicId: string,
  ): Promise<BaseWidget[] | undefined> {
    const widgets = await this.getAll();
    return widgets?.filter((widget) => widget.topicId === topicId);
  }
}

export const widgetService = new WidgetService();
