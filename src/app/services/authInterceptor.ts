import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  // URLs que não precisam de token
  const excludeUrls = ['/auth/login'];
  const needsAuth = !excludeUrls.some(url => req.url.includes(url));
  
  if (needsAuth) {
    const token = authService.getToken();
    
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return next(authReq);
    }
  }
  
  return next(req);
};