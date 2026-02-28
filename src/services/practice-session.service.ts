import { PracticeSession } from "../interfaces/practice-session.interface.js";
import sessionsMock from "../data/mock-sessions.data.json" with { type: "json" };
import { isPracticeSessionArray } from "../guards/practice-session.guards.js";
import { BaseDataService } from "./base-data.service.js";

class PracticeSessionService extends BaseDataService<PracticeSession> {
  protected endpoint = "sessions";
  protected mockData: unknown = sessionsMock;
  protected isValid = isPracticeSessionArray;

  async getPracticeSessions(): Promise<PracticeSession[] | undefined> {
    return this.getAll();
  }

  async getPracticeSessionsByUserId(
    userId: string,
  ): Promise<PracticeSession[] | undefined> {
    const sessions = await this.getAll();
    return sessions?.filter((session) => session.userId === userId);
  }

  async getPracticeSessionsByTopicId(
    topicId: string,
  ): Promise<PracticeSession[] | undefined> {
    const sessions = await this.getAll();
    return sessions?.filter((session) => session.topicId === topicId);
  }
}

export const practiceSessionService = new PracticeSessionService();
