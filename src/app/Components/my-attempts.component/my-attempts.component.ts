import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AttemptHistoryResponse } from '../../Models/quiz-attempt.model';
import { QuizAttemptService } from '../../Services/quiz-attempt.service';


@Component({
  selector: 'app-my-attempts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-attempts.component.html'
})
export class MyAttemptsComponent implements OnInit {
  attempts: AttemptHistoryResponse[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private quizAttemptService: QuizAttemptService) {}

  ngOnInit(): void {
    this.loadAttempts();
  }

  loadAttempts(): void {
    this.quizAttemptService.getMyAttempts().subscribe({
      next: (data) => {
        this.attempts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load attempts';
        this.loading = false;
      }
    });
  }

  getGradeBadgeClass(grade: string): string {
    if (grade === 'A+' || grade === 'A') return 'bg-success';
    if (grade === 'B') return 'bg-primary';
    if (grade === 'C') return 'bg-warning text-dark';
    return 'bg-danger';
  }
}