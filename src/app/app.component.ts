import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthGuardService } from './components/auth/services/auth-guard.service';
import { isAuthed, getUserState } from './components/auth/store/login.selectors';
import { Store } from '@ngrx/store';
import { User } from './components/auth/models/user.model';
import { logout } from './components/auth/store/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthGuardService ]
})

export class AppComponent {
  title = 'CryptoMon';
  navOpened: boolean = true;
  isAuthed$ = this.store.select(isAuthed);
  getUserState$ = this.store.select(getUserState)

  constructor(
    private AuthGuardService: AuthGuardService, 
    private store: Store<{ user: User }>,
  ) { }
  
  navMenuItems = [
    {  title: "portfolio", icon: "home", href: "" },
    {  title: "news", icon: "newspaper", href: "/news" },
    {  title: "cryptos", icon: "currency_bitcoin", href: "/cryptos" },
    {  title: "trades", icon: "currency_exchange", href: "/trades", },
    {  title: "about", icon: "info", href: "/about" }
  ]

  ngOnInit(): void {

  }

  logout(): void {
    this.store.dispatch(logout())
  }

}
