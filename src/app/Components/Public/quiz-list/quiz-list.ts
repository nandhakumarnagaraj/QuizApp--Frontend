import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Added
import { Quiz } from '../../../Models/quiz.model';
import { QuizService } from '../../../Services/quiz.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Added FormsModule
  templateUrl: './quiz-list.html',
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading: boolean = true;
  error: string = '';
  searchQuery: string = ''; // Added

  constructor(
    private quizService: QuizService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
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

  // New Search Method
  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.loadQuizzes();
      return;
    }
    
    this.loading = true;
    this.quizService.searchQuizByText(this.searchQuery).subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
        this.loading = false;
      },
      error: (err) => {
        // 404 or empty result
        this.quizzes = [];
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
        error: (err) => console.error(err)
      });
    }
  }
}