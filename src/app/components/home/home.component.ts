import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/login/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  isLoggedIn = false;
  windowScrolled = false;

  constructor(private tokenStorage: TokenStorageService){

    
  }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });

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
  
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  

}