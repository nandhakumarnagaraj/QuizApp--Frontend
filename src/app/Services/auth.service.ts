import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, request).pipe(
      tap((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register`, request, { responseType: 'text' });
  }

  registerAdmin(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.baseUrl}/register-admin`, request, { responseType: 'text' });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.token : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }
}
