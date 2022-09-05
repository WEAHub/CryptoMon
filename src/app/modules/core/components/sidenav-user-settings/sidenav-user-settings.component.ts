import { Component, Input, OnInit  } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { User } from 'src/app/modules/auth/models/user.model';
import { IAppStore } from '../../models/app.model';
import { IUserSettings } from '../../models/user-settings.model';

import { modifyUser } from '../../store/core-user.actions';
import { getToggleState } from '../../store/core-user.selectors';
import { toggleUserSidenav } from '../../store/core-user.actions';
import { getUserModify } from '../../store/core-user.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sidenav-user-settings',
  templateUrl: './sidenav-user-settings.component.html',
  styleUrls: ['./sidenav-user-settings.component.scss'],
})

export class CoreUserSettingsComponent implements OnInit {
  @Input() userState: User = <User>{};
  @Input() opened: boolean = true;

  toggleState$ = this.store.select(getToggleState);
  userModify$ = this.store.select(getUserModify);

  userSub: Subscription;
  userForm: FormGroup;
  shouldRelog: boolean = false;


  constructor(
    private store: Store<{ app: IAppStore }>,
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      currentPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      newPassword: new FormControl('', [Validators.maxLength(16), Validators.minLength(2)]),
    })
    this.userSub = this.userModify$.subscribe((state) => {
      if(!state.error && state.message !== 'Nothing to update.') {
        this.shouldRelog = true
      }
    })
  }

  ngOnInit(): void {
    this.userForm.controls['name'].setValue(this.userState.name);
  }
  
  userFormError(controlName: string, errorName: string) {
    return this.userForm.get(controlName)?.hasError(errorName)
  }

  onSidenavClose() {
    setTimeout(() => this.store.dispatch(toggleUserSidenav()), 300)
  }

  onSubmit(): void {
    
    if(this.userForm.invalid) {
      return
    }

    if(this.userForm.value.newPassword == this.userForm.value.currentPassword) {

      return
    }

    const userData: IUserSettings = {
      ...this.userForm.value,
      username: this.userState.username
    }

    this.store.dispatch(modifyUser({ data: userData }))
  }


}
