import { Component, OnInit,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';

import { AuthGuardService } from '../auth/services/auth-guard.service';

import { User } from '../auth/models/user.model';
import { IAppStore } from './models/app.model';
import { INavMenuItems } from './models/nav-items.model';

import { logout } from '../auth/store/auth.actions';
import { toggleUserSidenav, getUserStats } from './store/core-user.actions';

import { getNoConnection, userStats } from './store/core-user.selectors';
import { isAuthed, getUserState } from '../auth/store/auth.selectors';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  providers: [ AuthGuardService ]
})

export class CoreComponent implements OnInit {

  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState)
  getNoConnection$ = this.store.select(getNoConnection)
  getUserStats$ = this.store.select(userStats)

  userStatsSub: Subscription;

  currentRoute: string = '';
  userSettingsOpen: boolean = false;

  title = 'CryptoMon';
  navOpened: boolean = true;
  navMenuItems = <INavMenuItems[]> [
    {  title: "news", icon: "newspaper", href: "/news", enabled: true },
    {  title: "market", icon: "currency_bitcoin", href: "/market", enabled: true },
    {  title: "trades", icon: "currency_exchange", href: "/trades", enabled: true },
  ]


  constructor(
    private store: Store<{ user: User, app: IAppStore }>,
    private router: Router,
  ) {
    this.store.dispatch(getUserStats())

    this.userStatsSub = this.getUserStats$.subscribe((userState) => {
      Object.entries(userState).map(kvState => {
        const menuIdx = this.navMenuItems.findIndex(v => v.title == kvState[0])
        if(menuIdx) {
          this.navMenuItems[menuIdx].badgesCount = kvState[1]
        }
      })
    })

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
