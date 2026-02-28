import type { Topic } from "../interfaces/topic.interface.js";
import topicsMock from "../data/mock-topics.data.json" with { type: "json" };
import { isTopicArray } from "../guards/topic.guards.js";
import { BaseDataService } from "./base-data.service.js";

class TopicService extends BaseDataService<Topic> {
  protected endpoint = "topics";
  protected mockData: unknown = topicsMock;
  protected isValid = isTopicArray;

  async getTopics(): Promise<Topic[] | undefined> {
    return this.getAll();
  }

  async getTopicById(id: string): Promise<Topic | undefined> {
    const topics = await this.getAll();
    return topics?.find((topic) => topic.id === id);
  }
}

export const topicService = new TopicService();
