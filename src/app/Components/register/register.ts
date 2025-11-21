import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../Models/user.model';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user: RegisterRequest = {
    username: '',
    password: '',
    email: ''
  };
  confirmPassword: string = '';
  error: string = '';
  success: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.user.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.success = response;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}