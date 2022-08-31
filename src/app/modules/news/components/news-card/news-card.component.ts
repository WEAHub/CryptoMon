import { Component, Input, OnInit } from '@angular/core';
import { News, New } from './../../models/news.model'
import { inOutLoading } from '../../../shared/animations/shared.animations';

@Component({
  selector: 'news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  animations: [
    inOutLoading,
  ]
})

export class NewsCardComponent implements OnInit {

	@Input() feed: New = <New>{}

  constructor() { 

  }

  ngOnInit(): void {

  }

  openFeed(feed: New): void {
    if(feed.link && feed.link !== null) {
      window.open(feed.link, "_blank")?.focus();
    }
  }

}