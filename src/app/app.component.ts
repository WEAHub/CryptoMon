import { Component, OnInit,  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthGuardService } from './modules/auth/services/auth-guard.service';
import { isAuthed, getUserState } from './modules/auth/store/auth.selectors';

import { User } from './modules/auth/models/user.model';
import { logout } from './modules/auth/store/auth.actions';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthGuardService ]
})

export class AppComponent implements OnInit {
  title = 'CryptoMon';
  navOpened: boolean = true;
  navMenuItems = [
    {  title: "dashboard", icon: "home", href: "" },
    {  title: "news", icon: "newspaper", href: "/news" },
    {  title: "market", icon: "currency_bitcoin", href: "/market" },
    {  title: "assets", icon: "currency_exchange", href: "/assets", },
    {  title: "about", icon: "info", href: "/about" }
  ]

  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState);
  currentRoute: string = '';

  constructor(
    private AuthGuardService: AuthGuardService, 
    private store: Store<{ user: User }>,
    private route: ActivatedRoute,
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
