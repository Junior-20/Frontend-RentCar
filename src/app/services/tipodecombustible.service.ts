import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposdeCombustible } from '../interfaces/tiposde-combustible';
@Injectable({
  providedIn: 'root'
})
export class TipodecombustibleService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/TipodeCombustible/';
  constructor(private http: HttpClient) { }

  getCombustibles(): Observable<TiposdeCombustible[]> {
    return this.http.get<TiposdeCombustible[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCombustible(id: number): Observable<TiposdeCombustible> {
    return this.http.get<TiposdeCombustible>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteCombustible(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCombustible(combustible: TiposdeCombustible): Observable<TiposdeCombustible>{
    return this.http.post<TiposdeCombustible>(`${this.myAppUrl}${this.myApiUrl}`, combustible);
  }

  updateCombustible(id: number, combustible: TiposdeCombustible): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, combustible);
  }
}
