import { Component, OnInit,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';

import { AuthGuardService } from '../auth/services/auth-guard.service';
import { isAuthed, getUserState } from '../auth/store/auth.selectors';

import { User } from '../auth/models/user.model';
import { IAppStore } from './models/app.model';

import { logout } from '../auth/store/auth.actions';
import { toggleUserSidenav } from './store/core-user.actions';

import { INavMenuItems } from './models/nav-items.model';
import { getNoConnection } from './store/core-user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  providers: [ AuthGuardService ]
})

export class CoreComponent implements OnInit {
  title = 'CryptoMon';
  navOpened: boolean = true;
  navMenuItems = <INavMenuItems[]> [
    {  title: "news", icon: "newspaper", href: "/news", enabled: true },
    {  title: "market", icon: "currency_bitcoin", href: "/market", enabled: true },
    {  title: "trades", icon: "currency_exchange", href: "/trades", enabled: true },
  ]

  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState);
  getNoConnection$ = this.store.select(getNoConnection)
  currentRoute: string = '';
  userSettingsOpen: boolean = false;

  constructor(
    private store: Store<{ user: User, app: IAppStore }>,
    private router: Router,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.substring(1);
      }
    });
  }

  ngOnInit(): void {

  }

  toggleUserNav() {
    this.store.dispatch(toggleUserSidenav())
  }

  logout(): void {
    this.store.dispatch(logout())
  }

}
