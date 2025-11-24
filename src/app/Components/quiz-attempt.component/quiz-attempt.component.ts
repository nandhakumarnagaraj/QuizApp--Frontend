// ========== components/quiz-attempt/quiz-attempt.component.ts ==========
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Quiz } from '../../Models/quiz.model';
import { QuizService } from '../../Services/quiz.service';
import { QuizAttemptService } from '../../Services/quiz-attempt.service';
import { AnswerSubmission, QuizSubmissionRequest } from '../../Models/quiz-attempt.model';

@Component({
  selector: 'app-quiz-attempt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-attempt.component.html'
})
export class QuizAttemptComponent implements OnInit {
  quiz: Quiz | null = null;
  currentQuestionIndex: number = 0;
  selectedAnswers: Map<number, number> = new Map();
  loading: boolean = true;
  submitting: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService,
    private quizAttemptService: QuizAttemptService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadQuiz(+id);
    }
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizById(id).subscribe({
      next: (data) => {
        this.quiz = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quiz';
        this.loading = false;
      }
    });
  }

  get currentQuestion() {
    return this.quiz?.questions[this.currentQuestionIndex];
  }

  selectOption(questionId: number, optionId: number): void {
    this.selectedAnswers.set(questionId, optionId);
  }

  isOptionSelected(questionId: number, optionId: number): boolean {
    return this.selectedAnswers.get(questionId) === optionId;
  }

  nextQuestion(): void {
    if (this.quiz && this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  prevQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  goToQuestion(index: number): void {
    this.currentQuestionIndex = index;
  }

  isQuestionAnswered(questionId: number): boolean {
    return this.selectedAnswers.has(questionId);
  }

  get answeredCount(): number {
    return this.selectedAnswers.size;
  }

  submitQuiz(): void {
    if (!this.quiz) return;

    const answers: AnswerSubmission[] = [];
    this.selectedAnswers.forEach((optionId, questionId) => {
      answers.push({ questionId, selectedOptionId: optionId });
    });

    const request: QuizSubmissionRequest = {
      quizId: this.quiz.quizId!,
      answers
    };

    this.submitting = true;
    this.quizAttemptService.submitQuiz(request).subscribe({
      next: (result) => {
        this.router.navigate(['/result', result.attemptId]);
      },
      error: (err) => {
        this.error = 'Failed to submit quiz';
        this.submitting = false;
      }
    });
  }
}