import type { Topic } from "../interfaces/topic.interface.js";
import { API_BASE_URL, isMockData } from "../config/api.config.js";
import topicsMock from "../data/mock-topics.data.json" with { type: "json" };
import { isTopicArray } from "../guards/topic.guards.js";

class TopicService {
  async getTopics(): Promise<Topic[] | undefined> {
    if (isMockData()) {
      const data: unknown = topicsMock;

      if (isTopicArray(data)) {
        return data;
      }

      return;
    }

    return fetch(`${API_BASE_URL}/topics`)
      .then((response) => response.json())
      .then((data) => {
        if (isTopicArray(data)) {
          return data;
        }

        return;
      });
  }

  async getTopicById(id: string): Promise<Topic | undefined> {
    const topics = await this.getTopics();
    return topics?.find((topic) => topic.id === id);
  }
}

export const topicService = new TopicService();
