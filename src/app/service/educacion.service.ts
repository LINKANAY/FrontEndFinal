import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  //Url = 'http://localhost:8080/educacion/';
  //Url = 'https://portfolio-sebastian-linkanay.koyeb.app/educacion/'; 
  Url = environment.URL + '/educacion/';

  constructor(private http: HttpClient) { }

  public create(educacion: Educacion): Observable<any> {
    return this.http.post(this.Url + 'create', educacion, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.Url + 'list', cabecera);
  }

  public update(id: number, educacion: Educacion): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, educacion, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.Url + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.Url + `details/${id}`, cabecera);
  }
}
