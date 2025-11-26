import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizListComponent } from '../../../Public/quiz-list/quiz-list';
import { QuizService } from '../../../../Services/quiz.service';
import { QuizAttemptService } from '../../../../Services/quiz-attempt.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../Services/user.service';
import { UserService } from '../../../../Services/user.service';

@Component({
  selector: 'app-admin-action',
  standalone: true,
  imports: [RouterLink, QuizListComponent, CommonModule],
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.css'],
})
export class AdminActionComponent implements OnInit {
  quizCount: number = 0;
  userCount: number = 0;
  attemptCount: number = 0;

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private quizAttemptService: QuizAttemptService
  ) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe((quizzes) => {
      this.quizCount = quizzes.length;
    });
    this.userService.getUserCount().subscribe((count) => {
      this.userCount = count;
    });
    this.quizAttemptService.getAttemptCount().subscribe((count) => {
      this.attemptCount = count;
    });
  }
}

