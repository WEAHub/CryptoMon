import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

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

  gridLayout = [
    { breakpoint: Breakpoints.XSmall, cols: 1, rowHeight: '250px' },
    { breakpoint: Breakpoints.Small, cols: 2, rowHeight: '250px' },
    { breakpoint: Breakpoints.Medium, cols: 3, rowHeight: '250px' },
    { breakpoint: Breakpoints.Large, cols: 4, rowHeight: '250px' },
    { breakpoint: Breakpoints.XLarge, cols: 5, rowHeight: '260px' },
  ]

  actualGrid = this.gridLayout[3];
  breakpoints = this.gridLayout.map(layout => layout.breakpoint)
  
  constructor(
    private router: Router,
    private store: Store<{ news: News }>,
    private brObserver: BreakpointObserver) { 
  }

  ngOnInit(): void {

    this.brObserver.observe(this.breakpoints)
      .subscribe(brState => {
        const gridLayoutIdx = Object.values(brState.breakpoints)
          .findIndex(media => media === true);

      this.actualGrid = this.gridLayout[gridLayoutIdx]
    })

    this.store.dispatch(newsStart())
  }

  openFeed(feed: New): void {
    if(feed.link && feed.link !== null) {
      window.open(feed.link, "_blank")?.focus();
    }
  }

}
