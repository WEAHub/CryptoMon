import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthGuardService } from './modules/auth/services/auth-guard.service';
import { isAuthed, getUserState } from './modules/auth/store/auth.selectors';

import { User } from './modules/auth/models/user.model';
import { logout } from './modules/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthGuardService ]
})

export class AppComponent {
  title = 'CryptoMon';
  navOpened: boolean = true;
  navMenuItems = [
    {  title: "portfolio", icon: "home", href: "" },
    {  title: "news", icon: "newspaper", href: "/news" },
    {  title: "cryptos", icon: "currency_bitcoin", href: "/cryptos" },
    {  title: "trades", icon: "currency_exchange", href: "/trades", },
    {  title: "about", icon: "info", href: "/about" }
  ]

  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState)

  constructor(
    private AuthGuardService: AuthGuardService, 
    private store: Store<{ user: User }>,
  ) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.store.dispatch(logout())
  }

}
