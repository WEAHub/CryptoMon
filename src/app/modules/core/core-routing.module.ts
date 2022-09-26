import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'news',
    loadChildren: () => import('../news/news.module').then(m => m.NewsModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'market',
    loadChildren: () => import('../market/market.module').then(m => m.MarketModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'trades',
    loadChildren: () => import('../trades/trades.module').then(m => m.TradesModule),
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class CoreRoutingModule { }
