import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService extends BaseApiService {

  constructor(
    http: HttpClient,
    private authService: AuthService
  ) {
    super(http);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    const body = { cpf: data.cpf, password: data.password };
    return this.post<LoginResponse>('auth/login', body).pipe(
      tap(response => {
        // Automaticamente salvar os dados após login bem-sucedido
        this.authService.login(response.user, response.access_token);
      })
    );
  }
}
