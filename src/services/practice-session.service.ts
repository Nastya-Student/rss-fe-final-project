import { PracticeSession } from "../interfaces/practice-session.interface.js";
import { API_BASE_URL, isMockData } from "../config/api.config.js";
import sessionsMock from "../data/mock-sessions.data.json" with { type: "json" };
import { isPracticeSessionArray } from "../guards/practice-session.guards.js";

class PracticeSessionService {
  async getPracticeSessions(): Promise<PracticeSession[] | undefined> {
    if (isMockData()) {
      const data: unknown = sessionsMock;

      if (isPracticeSessionArray(data)) {
        return data;
      }

      return;
    }

    return fetch(`${API_BASE_URL}/sessions`)
      .then((response) => response.json())
      .then((data) => {
        if (isPracticeSessionArray(data)) {
          return data;
        }

        return;
      });
  }

  async getPracticeSessionsByUserId(
    userId: string,
  ): Promise<PracticeSession[] | undefined> {
    const sessions = await this.getPracticeSessions();
    return sessions?.filter((session) => session.userId === userId);
  }

  async getPracticeSessionsByTopicId(
    topicId: string,
  ): Promise<PracticeSession[] | undefined> {
    const sessions = await this.getPracticeSessions();
    return sessions?.filter((session) => session.topicId === topicId);
  }
}

export const practiceSessionService = new PracticeSessionService();
