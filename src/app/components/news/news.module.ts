import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from './news/news.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
		SharedModule,
    NewsRoutingModule,
  ]
})

export class NewsModule {}