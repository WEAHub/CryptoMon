import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthGuardService } from '../services/auth-guard.service';
import { logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root'
})

class AuthGuard implements CanActivate {
  constructor(
    private AuthGuardService: AuthGuardService,
    private store: Store
  ) { };
  
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthGuardService.isAuthenticated() || (this.store.dispatch(logout()), false);
  }
  
}

export {
  AuthGuard
}
