import { SessionAnswer } from "./session-answer.interface.js";

export interface PracticeSession {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  answers: SessionAnswer[];
  score: number;
  startedAt: string;
  completedAt: string;
}
