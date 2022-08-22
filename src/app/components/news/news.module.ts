import { NgModule } from '@angular/core';
import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from './news/news.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
		SharedModule,
    NewsRoutingModule,
  ]
})

export class NewsModule {}