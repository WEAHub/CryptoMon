import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { NewsComponent } from './news/news.component';


const routes: Routes = [
  { 
		path: '',
		component: NewsComponent,
		canActivate: [AuthGuard]
	},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class NewsRoutingModule { 
	
}
