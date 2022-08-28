import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './modules/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./modules/portfolio/portfolio.module').then(m => m.PortfolioModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'news',
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'market',
    loadChildren: () => import('./modules/market/market.module').then(m => m.MarketModule),
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
