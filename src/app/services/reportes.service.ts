import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class ReportesService {
   API_URI = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getReportes(data: string, page:number|undefined): Observable<any> {
    return this.http.get(`${this.API_URI}/reportes?data=${data}&page=${page}`);
  }

  saveReportes(Data: any): Observable<any> {
    return this.http.post(`${this.API_URI}/reportes`, Data);
  }

  deleteReportes(id: string){
    return this.http.delete(`${this.API_URI}/reportes/${id}`);
  }

  updateReportes(id: string|undefined, updatedReportes: any): Observable<any> {
    return this.http.put(`${this.API_URI}/reportes/${id}`, updatedReportes);
  }

} 
