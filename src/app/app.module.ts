// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing
import { AuthGuardService } from './components/auth/services/auth-guard.service'
import { AuthGuard } from './components/auth/guard/auth.guard'
import { JwtInterceptor } from './components/auth/intercepter/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { loginReducer } from './components/auth/store/login.reducer';
import { AuthEffects } from './components/auth/store/login.effects';

import { newsReducer } from './components/news/store/news.reducer';
import { NewsEffects } from './components/news/store/news.effects';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './components/auth/services/auth.service';
import { NewsService } from './components/news/services/news.service';

// Shared
import { SharedModule } from './shared/shared.module';

// Redux Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Env
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: loginReducer, news: newsReducer }),
    EffectsModule.forRoot([AuthEffects, NewsEffects]),
    BrowserAnimationsModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [AuthGuardService, AuthGuard, AuthService, NewsService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
