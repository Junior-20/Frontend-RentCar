import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Marca } from '../interfaces/marca';
@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Marcas/';
  constructor(private http: HttpClient) {}

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getMarca(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteMarca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.myAppUrl}${this.myApiUrl}`, marca);
  }

  updateMarca(id: number, marca: Marca): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, marca);
  }
}
