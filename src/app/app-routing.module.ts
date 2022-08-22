import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'

  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./components/portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./components/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'cryptos',
    loadChildren: () => import('./components/cryptos/cryptos.module').then(m => m.CryptosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
