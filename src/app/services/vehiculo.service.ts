import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehiculos } from '../interfaces/vehiculos';
@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/Vehiculo/';
  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculos[]> {
    return this.http.get<Vehiculos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getVehiculo(id: number): Observable<Vehiculos> {
    return this.http.get<Vehiculos>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteVehiculo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addVehiculo(vehiculo:Vehiculos): Observable<Vehiculos>{
    return this.http.post<Vehiculos>(`${this.myAppUrl}${this.myApiUrl}`, vehiculo);
  }

  updateVehiculo(id: number,vehiculo: Vehiculos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, vehiculo);
  }
}
