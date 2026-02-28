import { TopicProgress } from "../interfaces/topic-progress.interface.js";
import progressMock from "../data/mock-progress.data.json" with { type: "json" };
import { isTopicProgressArray } from "../guards/topic-progress.guards.js";
import { BaseDataService } from "./base-data.service.js";

class TopicProgressService extends BaseDataService<TopicProgress> {
  protected endpoint = "progress";
  protected mockData: unknown = progressMock;
  protected isValid = isTopicProgressArray;

  async getTopicProgress(): Promise<TopicProgress[] | undefined> {
    return this.getAll();
  }

  async getTopicProgressByUserId(
    userId: string,
  ): Promise<TopicProgress[] | undefined> {
    const progress = await this.getAll();
    return progress?.filter((item) => item.userId === userId);
  }

  async getTopicProgressByTopicId(
    topicId: string,
  ): Promise<TopicProgress[] | undefined> {
    const progress = await this.getAll();
    return progress?.filter((item) => item.topicId === topicId);
  }
}

export const topicProgressService = new TopicProgressService();
