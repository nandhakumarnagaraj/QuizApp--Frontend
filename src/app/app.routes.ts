import { Routes } from '@angular/router';
import { guestGuard } from './interceptors/guest.guard-interceptor';
import { authGuard } from './interceptors/auth.guard-interceptor';

export const routes: Routes = [
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
  
  // Public
  { 
    path: 'login', 
    loadComponent: () => import('./Components/login/login').then(m => m.LoginComponent),
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('./Components/register/register').then(m => m.RegisterComponent),
    canActivate: [guestGuard]
  },
  { 
    path: 'quizzes', 
    loadComponent: () => import('./Components/quiz-list/quiz-list').then(m => m.QuizListComponent)
  },
  
  // Protected
  { 
    path: 'quiz/create', 
    loadComponent: () => import('./Components/quiz-create.component/quiz-create.component').then(m => m.QuizCreateComponent),
    canActivate: [authGuard]
  },
  // NEW: Edit Route
  { 
    path: 'quiz/:id/edit', 
    loadComponent: () => import('./Components/quiz-edit.component/quiz-edit.component').then(m => m.QuizEditComponent),
    canActivate: [authGuard]
  },
  // NEW: Leaderboard Route
  { 
    path: 'leaderboard/:quizId', 
    loadComponent: () => import('./Components/leaderboard.component/leaderboard.component').then(m => m.LeaderboardComponent),
    canActivate: [authGuard]
  },
  
  { 
    path: 'quiz/:id', 
    loadComponent: () => import('./Components/quiz-detail.component/quiz-detail.component').then(m => m.QuizDetailComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'quiz/:id/attempt', 
    loadComponent: () => import('./Components/quiz-attempt.component/quiz-attempt.component').then(m => m.QuizAttemptComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'result/:attemptId', 
    loadComponent: () => import('./Components/quiz-result.component/quiz-result.component').then(m => m.QuizResultComponent),
    canActivate: [authGuard]
  },
  { 
    path: 'my-attempts', 
    loadComponent: () => import('./Components/my-attempts.component/my-attempts.component').then(m => m.MyAttemptsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'student-dashboard',
    loadComponent: () => import('./Components/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./Components/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '/quizzes' }
];