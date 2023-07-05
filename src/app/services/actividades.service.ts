import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  API_URI_ACTIVIDADES = 'http://localhost:8000/api/actividades';
  API_URI_REPORTES    = 'http://localhost:8000/api/reportes';
  constructor(private http: HttpClient) {}

  getActividades(data: string, page:number|undefined): Observable<any> {
    return this.http.get(`${this.API_URI_ACTIVIDADES}?data=${data}&page=${page}`);
  }

  saveActividades(categories: any): Observable<any> {
    return this.http.post(`${this.API_URI_ACTIVIDADES}`, categories);
  }

  deleteActividades(id: string){
    return this.http.delete(`${this.API_URI_ACTIVIDADES}/${id}`);
  }

  updateActividades(updatedActividades: any): Observable<any> {
    return this.http.put(`${this.API_URI_ACTIVIDADES}/${updatedActividades.id}`, updatedActividades);
  }

  getReportes(data: string, page:number|undefined, idActividad: string): Observable<any> {
    return this.http.get(`${this.API_URI_REPORTES}?data=${data}&page=${page}&actividad=${idActividad}`);
  }

  saveReportes(Data: any): Observable<any> {
    return this.http.post(`${this.API_URI_REPORTES}`, Data);
  }

  deleteReportes(id: string){
    return this.http.delete(`${this.API_URI_REPORTES}/${id}`);
  }

  updateReportes(updatedActividades: any): Observable<any> {
    return this.http.put(`${this.API_URI_REPORTES}/${updatedActividades.id}`, updatedActividades);
  }

}
