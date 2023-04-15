import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleados } from '../interfaces/empleados';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Empleado/';
  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleados[]> {
    return this.http.get<Empleados[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getEmpleado(id: number): Observable<Empleados> {
    return this.http.get<Empleados>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addEmpleado(empleado: Empleados): Observable<Empleados> {
    return this.http.post<Empleados>(`${this.myAppUrl}${this.myApiUrl}`, empleado);
  }

  updateEmpleado(id: number, empleado: Empleados): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, empleado);
  }
}
