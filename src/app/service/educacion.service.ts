import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = 'http://localhost:8080/educacion/';

  constructor(private http: HttpClient) { }

  public create(educacion: Educacion): Observable<any> {
    return this.http.post(this.educacionURL + 'create', educacion, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.educacionURL + 'list', cabecera);
  }

  public update(id: number, educacion: Educacion): Observable<any>{
    return this.http.put<any>(this.educacionURL + `update/${id}`, educacion, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.educacionURL + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.educacionURL + `details/${id}`, cabecera);
  }
}
