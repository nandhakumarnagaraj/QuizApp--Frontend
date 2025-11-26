import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttemptHistoryResponse } from '../../Models/quiz-attempt.model';
import { QuizAttemptService } from '../../../Services/quiz-attempt.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
  leaderboard: AttemptHistoryResponse[] = [];
  quizId: number = 0;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private quizAttemptService: QuizAttemptService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
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
      error: () => this.loading = false
    });
  }
}