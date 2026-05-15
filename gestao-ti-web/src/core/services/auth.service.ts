import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;
  private authenticated = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`,
      { username, password }
    ).pipe(
      tap(() => {
        this.authenticated = true;
        localStorage.setItem('authenticated', 'true');
        this.getCurrentUser().subscribe(user => {
          localStorage.setItem('userRole', user.role);
        });
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.authenticated = false;
        localStorage.removeItem('authenticated');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('authenticated') === 'true';
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  getCurrentUser(): Observable<{ username: string, role: string }> {
    return this.http.get<{ username: string, role: string }>(`${this.apiUrl}/me`);
  }

  isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'ROLE_ADMIN';
  }
}