// auth.service.ts
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth-token';
import { RegistrationForm } from 'src/app/interfaces/registration-form';
import { LoginForm } from '../interfaces/login-form';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUser: User | null = null;
  private baseUrl = 'https://knowyourteacher.online:81';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }
  
  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }

  registerUser(userDetails: RegistrationForm): Observable<any> {
    const url = `${this.baseUrl}/easyrent-api/v1/register_owner`;
    return this.http.post(url, userDetails);
  }

  registerTenant(userDetails: RegistrationForm): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.baseUrl}/easyrent-api/v1/register_tenant`;
    return this.http.post(url, userDetails, { headers }).pipe(
      tap((response: any) => {
        if (response && response.id) {
          localStorage.setItem('residentUserId', response.id);
        }
      })
    );
  }
  
  loginUser(loginForm: LoginForm) {
    const loginEndpoint = `${this.baseUrl}/easyrent-api/v1/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(loginEndpoint, loginForm, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Jeśli otrzymamy token, zapisz go w localStorage i zainicjuj użytkownika
          localStorage.setItem('token', response.token);
          this.initializeUser();
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInUser = null;
  }

  private initializeUser(): void {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken) {
        this.loggedInUser = {
          email: decodedToken.sub,
          role: decodedToken.roles[0]
        };
      }
    }
  }
}
