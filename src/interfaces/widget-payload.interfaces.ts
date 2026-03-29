export interface QuizPayload {
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface TrueFalsePayload {
  title: string;
  statement: string;
  correct: boolean;
  explanation?: string;
}

export interface CodeCompletionPayload {
  title: string;
  code: string;
  blanks: string[];
  correctAnswers: string[];
}

export interface CodeOrderingPayload {
  title: string;
  description: string;
  lines: string[];
  correctOrder: number[];
}

export interface MemoryGameObject {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface MemoryGameLink {
  from: string;
  to: string;
  label?: string;
}

export interface MemoryGamePayload {
  title: string;
  codeSnippet: string;
  objects: MemoryGameObject[];
  links: MemoryGameLink[];
  rootIds: string[];
  rootLinks: MemoryGameLink[];
  garbageIds: string[];
}

export interface StackBuilderStep {
  line: number;
  code: string;
  correctStack: string[];
}

export interface StackBuilderPayload {
  title: string;
  steps: StackBuilderStep[];
}

export interface AsyncSorterBucket {
  name: string;
  correctItems: string[];
}

export interface AsyncSorterPayload {
  title: string;
  code: string;
  buckets: AsyncSorterBucket[];
}
