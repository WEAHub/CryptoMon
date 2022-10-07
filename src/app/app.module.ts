// Angular
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Guards & Interceptor
import { AuthGuardService } from './modules/auth/services/auth-guard.service'
import { AuthGuard } from './modules/auth/guard/auth.guard'
import { JwtInterceptor } from './modules/auth/intercepter/jwt.interceptor';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { appReducer } from './modules/core/store/core-user.reducer'
import { UserEffects } from './modules/core/store/core-user.effects';

import { loginReducer } from './modules/auth/store/auth.reducer';
import { AuthEffects } from './modules/auth/store/auth.effects';

import { newsReducer } from './modules/news/store/news.reducer';
import { NewsEffects } from './modules/news/store/news.effects';

import { marketReducer } from './modules/market/store/market.reducer'
import { MarketEffects } from './modules/market/store/market.effects';


import { tradesReducer } from './modules/trades/store/trades.reducer';
import { TradesEffects } from './modules/trades/store/trades.effects';

// Core
import { CoreComponent } from './modules/core/core.component';
import { CoreUserSettingsComponent } from './modules/core/components/sidenav-user-settings/sidenav-user-settings.component';
import { CoreRoutingModule } from './modules/core/core-routing.module';

// Services
import { ConfigService, configFactory } from '@shared/services/config/config.service';
import { AuthService } from './modules/auth/services/auth.service';
import { NewsService } from './modules/news/services/news.service';
import { MarketService } from './modules/market/services/market.service';
import { UserService } from './modules/core/services/core-user.service';
import { TradesService } from './modules/trades/services/trades.service'

// Shared
import { SharedModule } from './modules/shared/shared.module';

// Redux Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Env
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    CoreComponent,
    CoreUserSettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ 
      app: appReducer,
      user: loginReducer,
      news: newsReducer,
      market: marketReducer,
      trades: tradesReducer,
    }),
    EffectsModule.forRoot([
      AuthEffects, 
      NewsEffects, 
      MarketEffects,
      UserEffects,
      TradesEffects
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      logOnly: environment.production 
    }),
  ],
  providers: [
    AuthGuard, 
    AuthGuardService, 
    AuthService, 
    NewsService, 
    MarketService,
    UserService,
    TradesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: configFactory,
      multi: true,
    },
  ],
  bootstrap: [CoreComponent]
})

export class AppModule {}
