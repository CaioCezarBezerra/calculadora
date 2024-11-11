import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BodyLogin } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: BodyLogin) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para obter o token JWT
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');  // Recupera o token do localStorage
  }

  // (Opcional) Método para armazenar o token no localStorage
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // (Opcional) Método para limpar o token do localStorage
  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  public get loggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }
}
