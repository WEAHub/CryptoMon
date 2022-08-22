import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';


import { getUserState } from '../store/login.selectors';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {

  constructor(
    private store: Store<{ user: User }>,
  ) { 
    
  }
  
  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}