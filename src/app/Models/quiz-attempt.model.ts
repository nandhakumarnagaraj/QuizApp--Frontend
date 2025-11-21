export interface AnswerSubmission {
  questionId: number;
  selectedOptionId: number;
}

export interface QuizSubmissionRequest {
  quizId: number;
  answers: AnswerSubmission[];
}

export interface QuestionResult {
  questionId: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface QuizResultResponse {
  attemptId: number;
  username: string;
  quizText: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  grade: string;
  attemptDate: string;
  questionResults: QuestionResult[];
}

export interface AttemptHistoryResponse {
  attemptId: number;
  quizText: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  grade: string;
  attemptDate: string;
}