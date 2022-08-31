import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from './components/news/news.component';
import { NewsCardComponent } from './components/news-card/news-card.component';

@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent],
  imports: [
		SharedModule,
    NewsRoutingModule,
  ]
})

export class NewsModule {}