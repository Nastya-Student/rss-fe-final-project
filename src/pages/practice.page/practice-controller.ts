import { EVENT } from "../../constants";
import { PracticeSession } from "../../interfaces/practice-session.interface";
import { SessionAnswer } from "../../interfaces/session-answer.interface";
import { Topic } from "../../interfaces/topic.interface";
import {
  deleteSession,
  getSession,
  setSession,
  updateSession,
} from "../../local-storage/current-session";
import { addSession, getSessions } from "../../local-storage/practice-sessions";
import { updateProgress } from "../../local-storage/progress";
import { getUser } from "../../local-storage/user";
import { Widget } from "../../types/widget.type";

// add this to the last widgets Next button
// export const resultOnclickHandler = (
//   resultButton: HTMLElement,
//   widgets: Widget[],
// ) => {
//   resultButton.addEventListener(EVENT.click, () => {
//     const currentSession: PracticeSession | undefined = getSession();
//     if (currentSession === undefined) {
//       throw new Error("Something went wrong. Please, try again.");
//     }
//     addSession(currentSession);
//     updateProgress();
//     renderResultScreen(currentSession, widgets);
//     deleteSession();
//   });
// };

// bind this with buttons in library and landing page
export const toPracticeButtonHandler = (
  button: HTMLButtonElement,
  topic: Topic,
) => {
  button.addEventListener(EVENT.click, () => {
    if (getSession() !== undefined) {
      deleteSession();
    }
    const user = getUser();
    const sessions = getSessions();
    if (!user) {
      throw new Error("Sorry, we have lost this user :(");
    }
    let id = "s1";
    if (sessions.length > 0) {
      id = `s${sessions.at(-1)?.id.slice(1)}`;
    }
    const date = new Date().toISOString();
    const session: PracticeSession = {
      id: id,
      userId: user.id,
      topicId: topic.id,
      topicTitle: topic.title,
      answers: [],
      score: 0,
      startedAt: date,
      completedAt: "",
    };
    setSession(session);
  });
};

// create this when open each widget
export const createAnswer = (widget: Widget): SessionAnswer => {
  return {
    widgetId: widget.id,
    isCorrect: false,
    timeSpent: Math.round(Math.random() * 20),
    difficulty: widget.difficulty,
  };
};

// run this when go to the next widget
export const addAnswerToCurrentSession = (answer: SessionAnswer) => {
  updateSession(answer, answer.difficulty, new Date().toISOString());
};
