import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AttemptHistoryResponse,
  QuizResultResponse,
  QuizSubmissionRequest,
} from '../Models/quiz-attempt.model';

@Injectable({
  providedIn: 'root',
})
export class QuizAttemptService {
  private baseUrl = 'http://localhost:8080/api/quiz-attempts';

  constructor(private http: HttpClient) {}

  submitQuiz(request: QuizSubmissionRequest): Observable<QuizResultResponse> {
    return this.http.post<QuizResultResponse>(`${this.baseUrl}/submit`, request);
  }

  getMyAttempts(): Observable<AttemptHistoryResponse[]> {
    return this.http.get<AttemptHistoryResponse[]>(`${this.baseUrl}/my-attempts`);
  }

  getAttemptDetails(attemptId: number): Observable<QuizResultResponse> {
    return this.http.get<QuizResultResponse>(`${this.baseUrl}/${attemptId}`);
  }

  getLeaderboard(quizId: number): Observable<AttemptHistoryResponse[]> {
    return this.http.get<AttemptHistoryResponse[]>(`${this.baseUrl}/leaderboard/${quizId}`);
  }
}
