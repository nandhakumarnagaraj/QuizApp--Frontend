export interface Option {
  optionId?: number;
  optionText: string;
  correct?: boolean; // Only for create/update (write-only)
}

export interface Question {
  questionId?: number;
  questionText: string;
  options: Option[];
}

export interface Quiz {
  quizId?: number;
  quizText: string;
  questions: Question[];
}