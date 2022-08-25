import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { AuthGuardService } from '../../services/auth-guard.service';
import { signupStart } from '../../store/auth.actions';
import { isUserLoading, userError } from '../../store/auth.selectors';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./../../shared/styles.scss', './signup.component.scss'],
  providers: [ AuthGuardService ]
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  authed = this.AuthGuardService.isAuthenticated()
  userLoading$ = this.store.select(isUserLoading);
  userErrorMsg$ = this.store.select(userError);

  constructor(
    private AuthGuardService : AuthGuardService, 
    private router: Router,
    private store: Store<{ user: User }>) { 
      this.signupForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
        username: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      })
  }

  ngOnInit(): void {
    if(this.authed) {
      this.router.navigate(['/portfolio'])
    }
  }

  signupFormError(controlName: string, errorName: string) {
    return this.signupForm.get(controlName)?.hasError(errorName)
  }
  
  onSubmit(): void {
    if(this.signupForm.invalid) {
      return;
    }

    this.store.dispatch(signupStart({userData: this.signupForm.value}));
  }

}
