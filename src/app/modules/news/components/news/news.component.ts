import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { News, New } from './../../models/news.model'
import { newsStart } from './../../store/news.actions';
import { getNews, isNewsLoading } from './../../store/news.selectors';
import { inOutLoading } from './../../../shared/animations/shared.animations';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  animations: [
    inOutLoading,
  ]
})

export class NewsComponent implements OnInit {

  newsLoading$ = this.store.select(isNewsLoading);
  newsData$ = this.store.select(getNews);


  constructor(
    private store: Store<{ news: News }>) { }

  ngOnInit(): void {
    this.store.dispatch(newsStart())
  }

  openFeed(feed: New): void {
    if(feed.link && feed.link !== null) {
      window.open(feed.link, "_blank")?.focus();
    }
  }

}
