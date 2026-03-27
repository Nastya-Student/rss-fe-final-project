import { supabase } from "./supabase";
import { getCurrentUserId } from "./user.service";
import type { PracticeSession } from "../interfaces/practice-session.interface";
import type { SessionAnswer } from "../interfaces/session-answer.interface";

type SessionRow = {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  completed_at: string;
};

type AnswerRow = {
  session_id: string;
  widget_id: string;
  is_correct: boolean;
  time_spent: number;
};

type Topic = {
  id: string;
  title: string;
};

const createTopicsMap = (topics: Topic[]): Map<string, string> => {
  const map = new Map<string, string>();
  for (const t of topics) {
    map.set(t.id, t.title);
  }
  return map;
};

export const createPracticeSession = async (
  topicId: string,
  answers: SessionAnswer[],
  topics: Topic[],
): Promise<PracticeSession> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) throw new Error("Not authenticated");

  const topicsMap = createTopicsMap(topics);

  const startedAt = new Date().toISOString();

  const correct = answers.filter((a) => a.isCorrect).length;
  const score =
    answers.length === 0 ? 0 : Math.round((correct / answers.length) * 100);

  const { data: session, error } = await supabase
    .from("practice_sessions")
    .insert({
      user_id: userId,
      topic_id: topicId,
      score,
      completed_at: new Date().toISOString(),
    })
    .select()
    .single<SessionRow>();

  if (error !== null) throw error;

  const answerRows: AnswerRow[] = [];

  for (const a of answers) {
    answerRows.push({
      session_id: session.id,
      widget_id: a.widgetId,
      is_correct: a.isCorrect,
      time_spent: a.timeSpent,
    });
  }

  const { error: answersError } = await supabase
    .from("session_answers")
    .insert(answerRows);

  if (answersError !== null) throw answersError;

  return {
    id: session.id,
    userId,
    topicId,
    topicTitle: topicsMap.get(topicId) ?? "Unknown",
    answers,
    score,
    startedAt,
    completedAt: session.completed_at,
  };
};

export const getMyPracticeSessions = async (
  topics: Topic[],
): Promise<PracticeSession[]> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) throw new Error("Not authenticated");

  const topicsMap = createTopicsMap(topics);

  const { data: sessions, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .overrideTypes<SessionRow[]>();

  if (error !== null) throw error;

  const result: PracticeSession[] = [];

  for (const session of sessions ?? []) {
    const { data: answers, error: answersError } = await supabase
      .from("session_answers")
      .select("*")
      .eq("session_id", session.id)
      .overrideTypes<AnswerRow[]>();

    if (answersError !== null) throw answersError;

    const mappedAnswers: SessionAnswer[] = [];

    for (const a of answers ?? []) {
      mappedAnswers.push({
        widgetId: a.widget_id,
        isCorrect: a.is_correct,
        timeSpent: a.time_spent,
      });
    }

    result.push({
      id: session.id,
      userId: session.user_id,
      topicId: session.topic_id,
      topicTitle: topicsMap.get(session.topic_id) ?? "Unknown",
      answers: mappedAnswers,
      score: session.score,
      startedAt: session.completed_at,
      completedAt: session.completed_at,
    });
  }

  return result;
};

export const getPracticeSession = async (
  sessionId: string,
  topics: Topic[],
): Promise<PracticeSession | undefined> => {
  const userId = await getCurrentUserId();
  if (userId === undefined) throw new Error("Not authenticated");

  const topicsMap = createTopicsMap(topics);

  const { data: session, error } = await supabase
    .from("practice_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle<SessionRow>();

  if (error !== null) throw error;
  if (session === null) return undefined;

  const { data: answers, error: answersError } = await supabase
    .from("session_answers")
    .select("*")
    .eq("session_id", session.id)
    .overrideTypes<AnswerRow[]>();

  if (answersError !== null) throw answersError;

  const mappedAnswers: SessionAnswer[] = [];

  for (const a of answers ?? []) {
    mappedAnswers.push({
      widgetId: a.widget_id,
      isCorrect: a.is_correct,
      timeSpent: a.time_spent,
    });
  }

  return {
    id: session.id,
    userId: session.user_id,
    topicId: session.topic_id,
    topicTitle: topicsMap.get(session.topic_id) ?? "Unknown",
    answers: mappedAnswers,
    score: session.score,
    startedAt: session.completed_at,
    completedAt: session.completed_at,
  };
};
