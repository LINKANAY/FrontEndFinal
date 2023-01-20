import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/login/auth.service';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService){}

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  onLogOut(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }
  


}