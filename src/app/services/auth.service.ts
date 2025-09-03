import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    try {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userString = localStorage.getItem(this.USER_KEY);
      
      if (token && userString) {
        const user = JSON.parse(userString);
        this.updateAuthState(user, token);
      }
    } catch (error) {
      console.error('Erro ao inicializar estado de auth:', error);
      this.clearAuthState();
    }
  }

  login(user: User, token: string): void {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.updateAuthState(user, token);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  logout(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      this.clearAuthState();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      window.location.href = '/login';
    }
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  getRoleDisplayName(role: string): string {
    const roleMap: Record<string, string> = {
      'admin': 'Administrador',
      'hr': 'Gente e Cultura',
      'collaborator': 'Colaborador'
    };
    return roleMap[role] || 'Função não definida';
  }

  private updateAuthState(user: User, token: string): void {
    this.authStateSubject.next({
      user,
      token,
      isAuthenticated: true
    });
  }

  private clearAuthState(): void {
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
}