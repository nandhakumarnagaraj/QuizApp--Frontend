import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { QuizAttemptService } from '../../../../Services/quiz-attempt.service';
import { CommonModule } from '@angular/common';
import { MyAttemptsComponent } from '../../my-attempts.component/my-attempts.component';

@Component({
  selector: 'app-student-action',
  standalone: true,
  imports: [RouterLink, CommonModule, MyAttemptsComponent],
  templateUrl: './student-action.component.html',
  styleUrls: ['./student-action.component.css'],
})
export class StudentActionComponent implements OnInit {
  studentName: string = '';
  attemptCount: number = 0;
  averageScore: number = 0;

  constructor(
    private authService: AuthService,
    private quizAttemptService: QuizAttemptService
  ) {}

  ngOnInit(): void {
    this.studentName = this.authService.getCurrentUser()?.username ?? '';
    this.quizAttemptService.getMyAttempts().subscribe((attempts) => {
      this.attemptCount = attempts.length;
      if (this.attemptCount > 0) {
        const totalScore = attempts.reduce(
          (sum, attempt) => sum + attempt.percentage,
          0
        );
        this.averageScore = totalScore / this.attemptCount;
      }
    });
  }
}

