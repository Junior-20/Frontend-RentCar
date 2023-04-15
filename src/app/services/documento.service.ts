import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Documento } from '../interfaces/documento'; 
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Documento/';
  constructor(private http: HttpClient) { }

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getDocumento(id: number): Observable<Documento> {
    return this.http.get<Documento>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addDocumento(documento: Documento): Observable<Documento> {
    return this.http.post<Documento>(`${this.myAppUrl}${this.myApiUrl}`, documento);
  }

  updateDocumento(id: number, documento: Documento): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, documento);
  }
}
