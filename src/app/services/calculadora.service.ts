import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BodyCaculadora } from '../interfaces/calculadora.interface';

@Injectable({
  providedIn: 'root',

})
export class CalculadoraService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  calcular(body: BodyCaculadora) {
    return this.http.post(`${this.apiUrl}/calculadora`, body);
  }
}
