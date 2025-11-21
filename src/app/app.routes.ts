// ========== app.routes.ts ==========
import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  
  // Public routes
  { 
    path: 'login', 
    loadComponent: () => import('../app/Components/login/login')
      .then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('../app/Components/register/register')
      .then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  { 
    path: 'quizzes', 
    loadComponent: () => import('../app/Components/quiz-list/quiz-list')
      .then(m => m.QuizListComponent)
  },
  { 
    path: 'quiz/:id', 
    loadComponent: () => import('../app/Components/quiz-detail.component/quiz-detail.component')
      .then(m => m.QuizDetailComponent)
  },

  // Protected routes
  { 
    path: 'quiz/create', 
    loadComponent: () => import('../app/Components/quiz-create.component/quiz-create.component')
      .then(m => m.QuizCreateComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'quiz/:id/attempt', 
    loadComponent: () => import('../app/Components/quiz-attempt.component/quiz-attempt.component')
      .then(m => m.QuizAttemptComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'result/:attemptId', 
    loadComponent: () => import('../app/Components/quiz-create.component/quiz-result/quiz-result.component')
      .then(m => m.QuizResultComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'my-attempts', 
    loadComponent: () => import('../app/Components/quiz-create.component/my-attempts/my-attempts.component')
      .then(m => m.MyAttemptsComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'leaderboard/:quizId', 
    loadComponent: () => import('../app/Components/quiz-create.component/leaderboard/leaderboard.component')
      .then(m => m.LeaderboardComponent),
    canActivate: [authGuard]
  },

  // Fallback
  { path: '**', redirectTo: '/quizzes' }
];

// ========== app.component.ts ==========
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../app/Components/quiz-create.component/navbar/navbar.component';
import { authInterceptor } from './interceptors/auth-interceptor';
import { guestGuard } from './interceptors/guest.guard-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'QuizApp';
}