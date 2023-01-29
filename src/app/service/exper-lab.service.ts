import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment ';
import { ExperienciaLaboral } from '../models/experienciaLaboral';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ExperLabService {

  //Url = 'http://localhost:8080/experLab/';
  //Url = 'https://portfolio-sebastian-linkanay.koyeb.app/experLab/'; 
  Url = environment.link + '/experLab/';
  
  constructor(private http: HttpClient) { }

  public create(experLab: ExperienciaLaboral): Observable<any> {
    return this.http.post(this.Url + 'create', experLab, cabecera);
  }

  public list(): Observable<any> {
    return this.http.get<any>(this.Url + 'list', cabecera);
  }

  public update(id: number, experLab: ExperienciaLaboral): Observable<any>{
    return this.http.put<any>(this.Url + `update/${id}`, experLab, cabecera);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.Url + `delete/${id}`, cabecera);
  }

  public details(id: number): Observable<any> {
    return this.http.get<any>(this.Url + `details/${id}`, cabecera);
  }
  
}
