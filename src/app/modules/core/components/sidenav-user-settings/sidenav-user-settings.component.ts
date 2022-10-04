import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs';;
import { Store } from '@ngrx/store';

import { User } from 'src/app/modules/auth/models/user.model';
import { IAppStore, IAppUserSettings } from '../../models/app.model';
import { IDeleteUser, IUserSettings } from '../../models/user-settings.model';

import { deleteUser, modifyUser } from '../../store/core-user.actions';
import { toggleUserSidenav } from '../../store/core-user.actions';
import { logout } from 'src/app/modules/auth/store/auth.actions';

import { getToggleState } from '../../store/core-user.selectors';
import { getUserModify } from '../../store/core-user.selectors';

import { CustomValidators } from '../../providers/customValidators';
import { getUserState } from 'src/app/modules/auth/store/auth.selectors';

@Component({
  selector: 'sidenav-user-settings',
  templateUrl: './sidenav-user-settings.component.html',
  styleUrls: ['./sidenav-user-settings.component.scss'],
})

export class CoreUserSettingsComponent implements OnInit, OnDestroy {
  @Input() opened: boolean = true;
  @ViewChild('currentPassword') currentPassword!: ElementRef;

  toggleState$ = this.store.select(getToggleState);
  userModify$ = this.store.select(getUserModify);
  getUserState$ = this.store.select(getUserState);
  
  userStateSub: Subscription;
  userState: User = <User>{};
  userModifySub: Subscription;
  userModifyState!: IAppUserSettings;
  userForm: FormGroup;

  constructor(
    private store: Store<{ app: IAppStore }>,
  ) {
    this.userStateSub = this.getUserState$.subscribe((state) => this.userState = state)
    this.userModifySub = this.userModify$.subscribe((state) => this.userModifyState = state)
    
    this.userForm = new FormGroup({
      name: new FormControl(this.userState.name, [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      currentPassword: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(2)]),
      newPassword: new FormControl('', [Validators.maxLength(16), Validators.minLength(2)]),
    }, 
    [CustomValidators.cantMatch('newPassword', 'currentPassword')]
    );
  }


  ngOnInit(): void {
    this.userForm.controls['name'].setValue(this.userState.name);
  }
  
  ngOnDestroy(): void {
    this.userModifySub.unsubscribe();
    this.userStateSub.unsubscribe();
  }

  userFormError(controlName: string, errorName: string) {
    return this.userForm.get(controlName)?.hasError(errorName)
  }

  onSidenavClose() {
    if(this.userModifyState.deleted) {
      this.userFormReset()
      alert('Redirecting to login...')
      this.store.dispatch(logout())
      return
    }
    setTimeout(() => this.store.dispatch(toggleUserSidenav()), 300)
  }

  onSidenavOpen() {
    this.userForm.controls['name'].setValue(this.userState.name);
    this.userFormReset();
  }

  onSubmit(): void {

    if(this.userForm.invalid) {
      return
    }

    const userData: IUserSettings = {
      ...this.userForm.value,
      username: this.userState.username
    }

    this.userFormReset()
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

    this.userFormReset()
    this.store.dispatch(deleteUser({data: deleteData}));

  }


  userFormReset() {
    this.userForm.get('currentPassword')?.reset();
    this.userForm.get('newPassword')?.reset();
  }

  get passwordMatchError() {
    return (
      this.userForm.getError('cantMatch') &&
      this.userForm.get('newPassword')?.touched &&
      this.userForm.get('currentPassword')?.value
    )
  }
}
