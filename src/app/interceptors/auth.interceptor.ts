// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Supondo que você tenha um AuthService para obter o token

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();  // Usamos o AuthService para pegar o token

    if (token) {
      // Se o token existir, clonamos a requisição e adicionamos o cabeçalho Authorization com o token
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      // Prossegue com a requisição clonada
      return next.handle(clonedReq);
    }

    // Caso não tenha token, continua com a requisição original
    return next.handle(req);
  }
}
