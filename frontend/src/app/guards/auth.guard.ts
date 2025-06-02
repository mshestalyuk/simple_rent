// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.data['userType']);

    // if (this.authService.isLoggedIn()) {
    //   // Jeśli użytkownik jest zalogowany, zezwól na dostęp
      return true;
    // } else {
    //   // Jeśli użytkownik nie jest zalogowany, przekieruj do komponentu logowania
    //   this.router.navigate(['/login']);
    //   return false;
    //}
  }
}