import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { AuthApiService } from '../../services/auth-api.service';
import { FormsModule } from '@angular/forms';
import { LoginResponse } from '../../models/login-response';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  cpfValue: string = '';
  passwordValue: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  readonly ArrowLeft = ArrowLeft;

  constructor(
    private router: Router,
    private api: AuthApiService
  ) {}

  handleHome() {
    this.router.navigate(['']);
  }
  
  onSubmit() {
    this.login(this.cpfValue, this.passwordValue);
  }

  login(cpf: string, password: string) {
    this.isLoading = true;
    this.errorMessage = '';

    const body: LoginRequest = { cpf, password };
    this.api.login(body).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login realizado com sucesso', response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['']);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        
        // Tratamento de diferentes tipos de erro
        if (err.status === 401) {
          this.errorMessage = 'CPF ou senha incorretos.';
        } else if (err.status === 0) {
          this.errorMessage = 'Erro de conexão. Verifique sua internet.';
        } else if (err.status >= 500) {
          this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
        } else {
          this.errorMessage = 'Erro inesperado. Tente novamente.';
        }
        
        console.error('Erro ao fazer login', err);
      },
    });
  }
}
