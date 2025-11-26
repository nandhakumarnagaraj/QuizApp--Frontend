import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Quiz } from '../../../Models/quiz.model';
import { QuizService } from '../../../Services/quiz.service';

@Component({
  selector: 'app-quiz-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz-edit.component.html'
})
export class QuizEditComponent implements OnInit {
  quiz: Quiz = { quizText: '', questions: [] };
  loading: boolean = true;
  saving: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
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
        this.error = 'Failed to load quiz data';
        this.loading = false;
      }
    });
  }

  addQuestion(): void {
    this.quiz.questions.push({
      questionText: '',
      options: [
        { optionText: '', correct: false },
        { optionText: '', correct: false },
        { optionText: '', correct: false },
        { optionText: '', correct: false }
      ]
    });
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

  onSubmit(): void {
    this.saving = true;
    this.quizService.updateQuiz(this.quiz.quizId!, this.quiz).subscribe({
      next: (updated) => {
        this.router.navigate(['/quiz', updated.quizId]);
      },
      error: (err) => {
        this.error = 'Failed to update quiz';
        this.saving = false;
      }
    });
  }
}