import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

//const Url = 'http://localhost:8080/auth/';
//const Url = 'https://portfolio-sebastian-linkanay.koyeb.app/auth/';
const Url = environment.URL + '/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LoggedIn: boolean;

  constructor(private http: HttpClient,) { 
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(Url + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(Url + 'register', {
      username,
      email,
      password
    }, httpOptions);
  }

  logIn(){
    this.LoggedIn = true;
  }

  logOut(){
    this.LoggedIn = false;
  }

  isAuthenticated(){
    return this.LoggedIn;
  }

}
