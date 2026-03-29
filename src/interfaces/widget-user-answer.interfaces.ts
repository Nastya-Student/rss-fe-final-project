export interface QuizAnswer {
  answer: string;
}
export interface TrueFalseAnswer {
  answer: boolean;
}

export interface CodeCompletionAnswer {
  answer: string[];
}

export interface CodeOrderingAnswer {
  answer: number[];
}

export interface MemoryGameAnswer {
  answer: string[];
}

export interface StackBuilderAnswer {
  answer: { line: number; stack: string[] }[];
}

export interface AsyncSorterAnswer {
  answer: { name: string; items: string[] }[];
}
