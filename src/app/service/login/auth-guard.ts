import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private tokenStorageService: TokenStorageService,
        private authService: AuthService,
        private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
             
            if(this.authService.isAuthenticated()) {
                console.log("logIn successful")
                return true;
               
            } else {
                this.router.navigate(['/login']);
                //window.location.reload();
                console.log("logIn Unsuccessful")
                return false;
                
            }

            //console.log("logIn successful")
            //return true;
        
    }
    


}

/*
canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // go to login if not authenticated
      return false;
    }
  return true;
}*/

