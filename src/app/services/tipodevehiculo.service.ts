import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TiposdeVehiculos } from '../interfaces/tiposde-vehiculos';
@Injectable({
  providedIn: 'root'
})
export class TipodevehiculoService {
  private myAppUrl: string = environment.endPoint;
  private myApiUrl: string = '/TiposdeVehiculos/';
  constructor(private http: HttpClient) { }

  getTiposVehiculos(): Observable<TiposdeVehiculos[]> {
    return this.http.get<TiposdeVehiculos[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getTipoVehiculo(id: number): Observable<TiposdeVehiculos> {
    return this.http.get<TiposdeVehiculos>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deleteTipoVehiculo(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addTipoVehiculo(tipovehiculo: TiposdeVehiculos): Observable<TiposdeVehiculos>{
    return this.http.post<TiposdeVehiculos>(`${this.myAppUrl}${this.myApiUrl}`, tipovehiculo);
  }

  updateTipoVehiculo(id: number,tipovehiculo: TiposdeVehiculos): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, tipovehiculo);
  }
}
