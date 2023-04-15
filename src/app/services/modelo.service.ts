import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modelos } from '../interfaces/modelos';
@Injectable({
  providedIn: 'root'
})
export class ModeloService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Modelos/';
  constructor(private http: HttpClient) { }
  getModelos(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getModelo(id: number): Observable<Modelos> {
    return this.http.get<Modelos>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteModelo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addModelo(modelo: Modelos): Observable<Modelos> {
    return this.http.post<Modelos>(`${this.myAppUrl}${this.myApiUrl}`, modelo);
  }

  updateModelo(id: number, modelo: Modelos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, modelo);
  }
}
