import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  URL = 'http://localhost:8080/proyectos/';

  constructor(private http: HttpClient) { }

  public create(proyecto: Proyecto): Observable<any> {
    return this.http.post(this.URL + 'create', proyecto, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.URL + 'list', cabecera);
  }

  public update(id: number, proyecto: Proyecto): Observable<any>{
    return this.http.put<any>(this.URL + `update/${id}`, proyecto, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.URL + `details/${id}`, cabecera);
  }
}
