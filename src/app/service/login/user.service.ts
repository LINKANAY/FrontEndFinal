import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment ';

//const Url = 'http://localhost:8080/auth/';
//const Url = 'https://portfolio-sebastian-linkanay.koyeb.app/auth/';
const Url = environment.link + 'auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(Url + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(Url + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(Url + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(Url + 'admin', { responseType: 'text' });
  }
}
