import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  //Url = 'http://localhost:8080/personas/';
  Url = 'https://portfolio-sebastian-linkanay.koyeb.app/personas/'; 

  constructor(private http: HttpClient) { }

  public create(persona: Persona): Observable<any> {
    return this.http.post<any>(this.Url + 'create', persona, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.Url + 'list', cabecera);
  }
  
  public update(id: number, persona: Persona): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, persona, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.Url + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.Url + `details/${id}`, cabecera);
  }


}
