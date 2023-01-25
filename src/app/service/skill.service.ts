import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  //Url = 'http://localhost:8080/skill/';
  Url = 'https://portfolio-sebastian-linkanay.koyeb.app/skill/'; 

  constructor(private http: HttpClient) { }

  public create(skill: Skill): Observable<any> {
    return this.http.post(this.Url + 'create', skill, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.Url + 'list', cabecera);
  }

  public update(id: number, skill: Skill): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, skill, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.Url + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.Url + `details/${id}`, cabecera);
  }

}
