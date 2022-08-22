import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})

class AuthGuard implements CanActivate {
  constructor(private AuthGuardService: AuthGuardService, private router: Router){};
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.AuthGuardService.isAuthenticated() || this.router.navigate(['/auth/login']).then(() => false);

  }
  
}


export {
  AuthGuard
}
