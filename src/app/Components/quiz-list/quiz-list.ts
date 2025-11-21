import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Quiz } from '../../Models/quiz.model';
import { QuizService } from '../../Services/quiz.service';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(
    private quizService: QuizService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load quizzes';
        this.loading = false;
      }
    });
  }

  deleteQuiz(id: number): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(id).subscribe({
        next: () => {
          this.quizzes = this.quizzes.filter(q => q.quizId !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete quiz';
        }
      });
    }
  }
}