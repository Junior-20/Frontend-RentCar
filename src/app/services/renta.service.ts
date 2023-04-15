import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Renta } from '../interfaces/renta';
@Injectable({
  providedIn: 'root'
})
export class RentaService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Renta/';
  constructor(private http: HttpClient) { }

  getRentas(): Observable<Renta[]> {
    return this.http.get<Renta[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getRenta(id: number): Observable<Renta> {
    return this.http.get<Renta>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteRenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addRenta(renta: Renta): Observable<Renta>{
    return this.http.post<Renta>(`${this.myAppUrl}${this.myApiUrl}`, renta);
  }

  updateRenta(id: number, renta: Renta): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, renta);
  }
}
