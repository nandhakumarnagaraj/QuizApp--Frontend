import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttemptHistoryResponse } from '../../../Models/quiz-attempt.model';
import { QuizAttemptService } from '../../../Services/quiz-attempt.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  leaderboard: AttemptHistoryResponse[] = [];
  quizId: number = 0;
  loading: boolean = true;
  error: string = '';
  currentUsername: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private quizAttemptService: QuizAttemptService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
    this.currentUsername = this.authService.getCurrentUser()?.username ?? null;
    if (this.quizId) {
      this.loadLeaderboard();
    }
  }

  loadLeaderboard(): void {
    this.quizAttemptService.getLeaderboard(this.quizId).subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load leaderboard.';
        this.loading = false;
      },
    });
  }

  isCurrentUser(username: string): boolean {
    return this.currentUsername === username;
  }

  getGradeBadgeClass(grade: string): string {
    switch (grade) {
      case 'A':
        return 'bg-success';
      case 'B':
        return 'bg-primary';
      case 'C':
        return 'bg-info';
      case 'D':
        return 'bg-warning';
      default:
        return 'bg-danger';
    }
  }
}