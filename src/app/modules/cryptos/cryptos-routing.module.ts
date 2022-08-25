import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CryptosComponent } from './components/cryptos/cryptos.component';


const routes: Routes = [
  { 
		path: '',
		component: CryptosComponent,
		canActivate: [AuthGuard]
	},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CryptosRoutingModule { 
	
}
