import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente'; 

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Cliente/';
  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.myAppUrl}${this.myApiUrl}`, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, cliente);
  }
}
