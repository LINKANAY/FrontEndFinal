import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  personaURL = 'http://localhost:8080/personas/';

  constructor(private http: HttpClient) { }

  public list(): Observable<Persona> {
    return this.http.get<Persona>(this.personaURL + 'list', cabecera);
  }

  public verPersona(): Observable<Persona>{
    return this.http.get<Persona>(this.personaURL + 'verPersona', cabecera);
  }

  public getPersona(id: number): Observable<Persona>{
    return this.http.get<Persona>(this.personaURL + `detail/${id}`, cabecera);
  }

  public update(id: number, persona: Persona): Observable<any>{
    return this.http.put<any>(this.personaURL + `update/${id}`, persona, cabecera);
  }


}
