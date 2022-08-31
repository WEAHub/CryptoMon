// Angular
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing
import { AuthGuardService } from './modules/auth/services/auth-guard.service'
import { AuthGuard } from './modules/auth/guard/auth.guard'
import { JwtInterceptor } from './modules/auth/intercepter/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { loginReducer } from './modules/auth/store/auth.reducer';
import { AuthEffects } from './modules/auth/store/auth.effects';

import { newsReducer } from './modules/news/store/news.reducer';
import { NewsEffects } from './modules/news/store/news.effects';

import { marketReducer } from './modules/market/store/market.reducer'
import { MarketEffects } from './modules/market/store/market.effects';

// Components
import { AppComponent } from './modules/core/app.component';

// Services
import { ConfigService, configFactory } from './services/config.service'
import { AuthService } from './modules/auth/services/auth.service';
import { NewsService } from './modules/news/services/news.service';
import { MarketService } from './modules/market/services/market.service';

// Shared
import { SharedModule } from './modules/shared/shared.module';

// Redux Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Env
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ 
      user: loginReducer,
      news: newsReducer,
      market: marketReducer
    }),
    EffectsModule.forRoot([
      AuthEffects, 
      NewsEffects, 
      MarketEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AuthGuard, 
    AuthGuardService, 
    AuthService, 
    NewsService, 
    MarketService,
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
  bootstrap: [AppComponent]
})

export class AppModule { }
