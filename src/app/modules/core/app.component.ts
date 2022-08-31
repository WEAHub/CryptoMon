import { Component, OnInit,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';

import { AuthGuardService } from './../auth/services/auth-guard.service';
import { isAuthed, getUserState } from './../auth/store/auth.selectors';

import { User } from './../auth/models/user.model';
import { logout } from './../auth/store/auth.actions';

import { INavMenuItems } from './models/navitems.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthGuardService ]
})

export class AppComponent implements OnInit {
  title = 'CryptoMon';
  navOpened: boolean = true;
  navMenuItems = <Array<INavMenuItems>>[
    //{  title: "dashboard", icon: "home", href: "", enabled: false },
    {  title: "news", icon: "newspaper", href: "/news", enabled: true },
    {  title: "market", icon: "currency_bitcoin", href: "/market", enabled: true },
    // {  title: "assets", icon: "currency_exchange", href: "/assets", enabled: false },
    // {  title: "about", icon: "info", href: "/about", enabled: false }
  ]

  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState);
  currentRoute: string = '';

  constructor(
    private store: Store<{ user: User }>,
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

  logout(): void {
    this.store.dispatch(logout())
  }

}
