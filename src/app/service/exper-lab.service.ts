import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienciaLaboral } from '../models/experienciaLaboral';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ExperLabService {

  experLabURL = 'http://localhost:8080/experLab/';

  constructor(private http: HttpClient) { }

  public create(experLab: ExperienciaLaboral): Observable<any> {
    return this.http.post(this.experLabURL + 'create', experLab, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.experLabURL + 'list', cabecera);
  }

  public update(id: number, experLab: ExperienciaLaboral): Observable<any>{
    return this.http.put<any>(this.experLabURL + `update/${id}`, experLab, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.experLabURL + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.experLabURL + `details/${id}`, cabecera);
  }
  
}
