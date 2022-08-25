import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PortfolioRoutingModule } from "./portfolio-routing.module";

import { PortfolioComponent } from './components/portfolio/portfolio.component';


@NgModule({
  declarations: [PortfolioComponent],
  imports: [
    PortfolioRoutingModule,
		SharedModule,
  ]
})

export class PortfolioModule {}