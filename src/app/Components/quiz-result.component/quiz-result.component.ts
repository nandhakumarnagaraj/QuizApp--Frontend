// ========== components/quiz-result/quiz-result.component.ts ==========
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuizResultResponse } from '../../Models/quiz-attempt.model';
import { QuizAttemptService } from '../../Services/quiz-attempt.service';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-result.component.html',
})
export class QuizResultComponent implements OnInit {
  result: QuizResultResponse | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(private route: ActivatedRoute, private quizAttemptService: QuizAttemptService) {}

  ngOnInit(): void {
    const attemptId = this.route.snapshot.paramMap.get('attemptId');
    if (attemptId) {
      this.loadResult(+attemptId);
    }
  }

  loadResult(attemptId: number): void {
    this.quizAttemptService.getAttemptDetails(attemptId).subscribe({
      next: (data) => {
        this.result = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load result';
        this.loading = false;
      },
    });
  }

  getGradeClass(grade: string): string {
    if (grade === 'A+' || grade === 'A') return 'success';
    if (grade === 'B') return 'primary';
    if (grade === 'C') return 'warning';
    return 'danger';
  }
}
