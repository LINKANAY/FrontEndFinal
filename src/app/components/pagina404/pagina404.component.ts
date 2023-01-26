import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';

@Component({
  selector: 'app-pagina404',
  templateUrl: './pagina404.component.html',
  styleUrls: ['./pagina404.component.css']
})
export class Pagina404Component implements OnInit {
  
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService){  
  }

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
