import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { NewsService } from '../services/news.service';
import * as newsActions from './news.actions'


@Injectable()

export class NewsEffects {
	
	newsStart$ = createEffect(() => this.actions$.pipe(
		ofType(newsActions.newsStart),
		exhaustMap(() => this.newsService.getNews().pipe(
			map((news) => newsActions.newsSuccess({news})),
			catchError(error => of(newsActions.newsError()))
		))
	));

	
	constructor(
		private actions$: Actions, 
		private newsService: NewsService,
		private router: Router
	) {}
}