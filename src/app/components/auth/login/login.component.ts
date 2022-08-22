import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';


import { User } from '../models/user.model';
import { AuthGuardService } from '../services/auth-guard.service';
import { loginStart } from '../store/login.actions';
import { isUserLoading, userError } from '../store/login.selectors';

import { Validators, FormControl, FormGroup } from '@angular/forms';

import { inOutLoading } from 'src/app/shared/animations/shared.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthGuardService ],
  animations: [ inOutLoading ]
})

export class LoginComponent implements OnInit {

  authed = this.AuthGuardService.isAuthenticated()
  userLoading$ = this.store.select(isUserLoading);
  userErrorMsg$ = this.store.select(userError);

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.maxLength(16),
      Validators.minLength(2)
    ]),
    password: new FormControl('', [
      Validators.required, 
      Validators.maxLength(16),
      Validators.minLength(2)
    ]),
  })

  constructor(
    private AuthGuardService : AuthGuardService, 
    private router: Router,
    private store: Store<{ user: User }>) { 
      
  }

  ngOnInit(): void {
    if(this.authed) {
      this.router.navigate(['/portfolio'])
    }
  }

  loginFormError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }
  
  onSubmit(): void {
    this.store.dispatch(loginStart({userData: this.loginForm.value}));
  }
}
