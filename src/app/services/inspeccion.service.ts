import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Inspeccion } from '../interfaces/inspeccion';
@Injectable({
  providedIn: 'root'
})
export class InspeccionService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Inspeccion/';
  constructor(private http: HttpClient) { }

  getInspecciones(): Observable<Inspeccion[]> {
    return this.http.get<Inspeccion[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getInspeccion(id: number): Observable<Inspeccion> {
    return this.http.get<Inspeccion>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteInspeccion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addInspeccion(inspeccion: Inspeccion): Observable<Inspeccion> {
    return this.http.post<Inspeccion>(`${this.myAppUrl}${this.myApiUrl}`, inspeccion);
  }

  updateInspeccion(id: number, inspeccion: Inspeccion): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, inspeccion);
  }
}
