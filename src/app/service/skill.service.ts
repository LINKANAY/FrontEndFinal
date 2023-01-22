import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillURL = 'http://localhost:8080/skill/';

  constructor(private http: HttpClient) { }

  public create(skill: Skill): Observable<any> {
    return this.http.post(this.skillURL + 'create', skill, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.skillURL + 'list', cabecera);
  }

  public update(id: number, skill: Skill): Observable<any>{
    return this.http.put<any>(this.skillURL + `update/${id}`, skill, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.skillURL + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.skillURL + `details/${id}`, cabecera);
  }

}
