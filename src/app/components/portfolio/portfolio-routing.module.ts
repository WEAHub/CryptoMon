import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { AuthGuard } from './../auth/guard/auth.guard';
import { PortfolioComponent } from './portfolio/portfolio.component';


const routes: Routes = [
  { 
		path: '',
		component: PortfolioComponent,
		canActivate: [AuthGuard]
	},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PortfolioRoutingModule { 
}
