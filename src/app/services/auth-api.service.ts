import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})

export class AuthApiService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http);
  }
  login(data: LoginRequest): Observable<LoginResponse> {
    const body = { cpf: data.cpf, password: data.password };
    return this.post('auth/login', body);
  }
}
