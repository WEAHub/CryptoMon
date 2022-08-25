import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from "./news-routing.module";

import { NewsComponent } from './components/news/news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [
		SharedModule,
    NewsRoutingModule,
  ]
})

export class NewsModule {}