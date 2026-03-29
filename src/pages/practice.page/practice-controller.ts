import { EVENT } from "../../constants";
import { PracticeSession } from "../../interfaces/practice-session.interface";
import { getSession } from "../../local-storage/current-session";
import { addSession } from "../../local-storage/practice-sessions";
import { updateProgress } from "../../local-storage/progress";
import { Widget } from "../../types/widget.type";
import { renderResultScreen } from "../result-screen/result-screen ";

// add this to the last widgets button
export const resultOnclickHandler = (
  resultButton: HTMLElement,
  widgets: Widget[],
) => {
  resultButton.addEventListener(EVENT.click, () => {
    const currentSession: PracticeSession = getSession();
    addSession(currentSession);
    updateProgress();
    renderResultScreen(currentSession, widgets);
  });
};
