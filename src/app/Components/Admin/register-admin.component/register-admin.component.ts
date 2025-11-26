import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { RegisterRequest } from '../../../Models/user.model';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-5">
      <div class="card p-4 shadow-lg mx-auto" style="max-width: 500px;">
        <h2 class="text-center mb-4 text-danger">Register Admin</h2>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
        <form (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label>Username</label>
            <input type="text" [(ngModel)]="user.username" name="username" class="form-control" required>
          </div>
          <div class="mb-3">
            <label>Email</label>
            <input type="email" [(ngModel)]="user.email" name="email" class="form-control" required>
          </div>
          <div class="mb-3">
            <label>Password</label>
            <input type="password" [(ngModel)]="user.password" name="password" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-danger w-100">Create Admin Account</button>
        </form>
      </div>
    </div>
  `
})
export class RegisterAdminComponent {
  user: RegisterRequest = { username: '', password: '', email: '' };
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registerAdmin(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => this.error = err.error || 'Failed to register admin'
    });
  }
}