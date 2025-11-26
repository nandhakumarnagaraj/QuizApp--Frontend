// ========== components/quiz-create/quiz-create.component.ts ==========
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Question, Quiz } from '../../Models/quiz.model';
import { QuizService } from '../../Services/quiz.service';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz-create.component.html'
})
export class QuizCreateComponent {
  quiz: Quiz = {
    quizText: '',
    questions: []
  };
  loading: boolean = false;
  error: string = '';

  constructor(private quizService: QuizService, private router: Router) {
    this.addQuestion(); // Start with one question
  }

  addQuestion(): void {
    const newQuestion: Question = {
      questionText: '',
      options: [
        { optionText: '', correct: false },
        { optionText: '', correct: false },
        { optionText: '', correct: false },
        { optionText: '', correct: false }
      ]
    };
    this.quiz.questions.push(newQuestion);
  }

  removeQuestion(index: number): void {
    if (this.quiz.questions.length > 1) {
      this.quiz.questions.splice(index, 1);
    }
  }

  setCorrectOption(questionIndex: number, optionIndex: number): void {
    this.quiz.questions[questionIndex].options.forEach((opt, i) => {
      opt.correct = (i === optionIndex);
    });
  }

  isValid(): boolean {
    if (!this.quiz.quizText.trim()) return false;
    
    for (const question of this.quiz.questions) {
      if (!question.questionText.trim()) return false;
      
      const hasCorrect = question.options.some(o => o.correct);
      if (!hasCorrect) return false;
      
      for (const option of question.options) {
        if (!option.optionText.trim()) return false;
      }
    }
    return true;
  }

  onSubmit(): void {
    if (!this.isValid()) {
      this.error = 'Please fill all fields and mark correct answers';
      return;
    }

    this.loading = true;
    this.error = '';

    this.quizService.createQuiz(this.quiz).subscribe({
      next: (created) => {
        this.router.navigate(['/quiz', created.quizId]);
      },
      error: (err) => {
        this.error = err.error || 'Failed to create quiz';
        this.loading = false;
      }
    });
  }
}