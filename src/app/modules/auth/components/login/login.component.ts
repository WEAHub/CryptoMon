import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { AuthGuardService } from './../../services/auth-guard.service';

import { User } from './../../models/user.model';
import { loginStart } from '../../store/auth.actions';
import { isUserLoading, userError } from '../../store/auth.selectors';

import { inOutLoading } from './../../../shared/animations/shared.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../../shared/styles.scss', './login.component.scss'],
  providers: [ AuthGuardService ],
  animations: [ inOutLoading ]
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  authed = this.AuthGuardService.isAuthenticated()
  userLoading$ = this.store.select(isUserLoading);
  userErrorMsg$ = this.store.select(userError);

  constructor(
    private AuthGuardService : AuthGuardService, 
    private router: Router,
    private store: Store<{ user: User }>) { 
      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      })
  }

  ngOnInit(): void {
    if(this.authed) {
      this.router.navigate(['/news'])
    }
  }

  loginFormError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName)
  }
  
  onSubmit(): void {
    if(this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(loginStart({userData: this.loginForm.value}));
  }
}
