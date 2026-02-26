import { TopicProgress } from "../interfaces/topic-progress.interface.js";
import { API_BASE_URL, isMockData } from "../config/api.config.js";
import progressMock from "../data/mock-progress.data.json" with { type: "json" };
import { isTopicProgressArray } from "../guards/topic-progress.guards.js";

class TopicProgressService {
  async getTopicProgress(): Promise<TopicProgress[] | undefined> {
    if (isMockData()) {
      const data: unknown = progressMock;

      if (isTopicProgressArray(data)) {
        return data;
      }

      return;
    }

    return fetch(`${API_BASE_URL}/progress`)
      .then((response) => response.json())
      .then((data) => {
        if (isTopicProgressArray(data)) {
          return data;
        }

        return;
      });
  }

  async getTopicProgressByUserId(
    userId: string,
  ): Promise<TopicProgress[] | undefined> {
    const progress = await this.getTopicProgress();
    return progress?.filter((item) => item.userId === userId);
  }

  async getTopicProgressByTopicId(
    topicId: string,
  ): Promise<TopicProgress[] | undefined> {
    const progress = await this.getTopicProgress();
    return progress?.filter((item) => item.topicId === topicId);
  }
}

export const topicProgressService = new TopicProgressService();
