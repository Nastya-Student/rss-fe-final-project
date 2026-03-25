import { PracticeSession } from "../../../interfaces/practice-session.interface";
import Chart from "chart.js/auto";
import { groupDataByDays } from "./get-achievements";

export const createChart = (
  ctx: HTMLCanvasElement,
  sessions: PracticeSession[],
): void => {
  const days = getAllDateArray(sessions);
  const correctAnswers = getAllCorrectAnswers(sessions);
  new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "# of correct answers",
          data: correctAnswers,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export const getAllDateArray = (sessions: PracticeSession[]): string[] => {
  const set: Set<string> = new Set();
  for (const element of sessions) {
    const date: string = element.completedAt.split("T")[0] ?? "";
    set.add(date);
  }
  return [...set];
};

export const getAllCorrectAnswers = (sessions: PracticeSession[]): number[] => {
  const groups = Object.entries(groupDataByDays(sessions));
  const result: number[] = [];
  for (const element of groups) {
    const dailySessions = element[1];
    let correctAnswers = 0;
    if (dailySessions) {
      for (const session of dailySessions) {
        correctAnswers += session.answers.filter(
          (item) => item.isCorrect,
        ).length;
      }
    }
    result.push(correctAnswers);
  }

  return result;
};
