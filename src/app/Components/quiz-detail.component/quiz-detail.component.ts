import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Quiz } from '../../Models/quiz.model';
import { QuizService } from '../../Services/quiz.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './quiz-detail.component.html',
})
export class QuizDetailComponent implements OnInit {
  [x: string]: any;
  quiz: Quiz | null = null;
  loading: boolean = true;
  error: String = '';

  String: any;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    public authService: AuthService
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
        this.error = 'Failed to load quiz';
        this.loading = false;
      },
    });
  }
}
