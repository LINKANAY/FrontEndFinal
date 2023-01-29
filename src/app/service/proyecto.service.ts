import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment ';
import { Proyecto } from '../models/proyecto';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  //Url = 'http://localhost:8080/proyectos/';
  //Url = 'https://portfolio-sebastian-linkanay.koyeb.app/proyectos/'; 
  Url = environment.link + '/proyectos/';

  constructor(private http: HttpClient) { }

  public create(proyecto: Proyecto): Observable<any> {
    return this.http.post(this.Url + 'create', proyecto, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.Url + 'list', cabecera);
  }

  public update(id: number, proyecto: Proyecto): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, proyecto, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.Url + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.Url + `details/${id}`, cabecera);
  }
}
