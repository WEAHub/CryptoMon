import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';;
import { Store } from '@ngrx/store';

import { User } from 'src/app/modules/auth/models/user.model';
import { IAppStore, IAppUserSettings } from '../../models/app.model';
import { IDeleteUser, IUserSettings } from '../../models/user-settings.model';

import { deleteUser, modifyUser } from '../../store/core-user.actions';
import { toggleUserSidenav } from '../../store/core-user.actions';
import { getToggleState } from '../../store/core-user.selectors';
import { getUserModify } from '../../store/core-user.selectors';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
import { logout } from 'src/app/modules/auth/store/auth.actions';

@Component({
  selector: 'sidenav-user-settings',
  templateUrl: './sidenav-user-settings.component.html',
  styleUrls: ['./sidenav-user-settings.component.scss'],
})

export class CoreUserSettingsComponent implements OnInit, OnDestroy {
  @Input() userState: User = <User>{};
  @Input() opened: boolean = true;
  @ViewChild('currentPassword') currentPassword!: ElementRef;

  toggleState$ = this.store.select(getToggleState);
  userModify$ = this.store.select(getUserModify);

  userSub: Subscription;
  userModifyState!: IAppUserSettings;
  userForm: FormGroup;


  constructor(
    private store: Store<{ app: IAppStore }>,
    private configService: ConfigService,
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      currentPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      newPassword: new FormControl('', [Validators.maxLength(16), Validators.minLength(2)]),
    })
    this.userSub = this.userModify$.subscribe((state) => {
      this.userModifyState = state;
    })
  }


  ngOnInit(): void {
    this.userForm.controls['name'].setValue(this.userState.name);
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  userFormError(controlName: string, errorName: string) {
    return this.userForm.get(controlName)?.hasError(errorName)
  }

  onSidenavClose() {
    if(this.userModifyState.deleted) {
      alert('Redirecting to login...')
      this.store.dispatch(logout())
      return
    }
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

  deleteUser(): void {
    const currentPasswordCtl: AbstractControl = this.userForm.controls['currentPassword'];
    
    if(currentPasswordCtl.invalid) {
      this.currentPassword.nativeElement.focus();
      return
    }

    const deleteData: IDeleteUser = {
      username: this.userState.username,
      password: currentPasswordCtl.value
    }

    this.store.dispatch(deleteUser({data: deleteData}));

  }
}
