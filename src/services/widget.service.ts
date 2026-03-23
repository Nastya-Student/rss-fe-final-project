import widgetsMock from "../data/mock-widgets.data.json" with { type: "json" };
import { BaseDataService } from "./base-data.service.js";
import { Widget } from "../types/widget.type.js";
import { isWidgetArray } from "../guards/widget.guards.js";

export class WidgetService extends BaseDataService<Widget> {
  protected endpoint = "widgets";
  protected mockData: unknown = widgetsMock;
  protected isValid = isWidgetArray;

  async getWidgets(): Promise<Widget[] | undefined> {
    return this.getAll();
  }

  async getWidgetsByTopicId(topicId: string): Promise<Widget[] | undefined> {
    const widgets = await this.getAll();
    return widgets?.filter((widget) => widget.topicId === topicId);
  }
}

export const widgetService = new WidgetService();
