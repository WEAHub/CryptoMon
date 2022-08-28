import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, exhaustMap, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import * as marketActions from './market.actions';
import { MarketService } from '../services/market.service';

@Injectable()

export class MarketEffects {

	newsStart$ = createEffect(() => this.actions$.pipe(
		ofType(marketActions.marketTableStart),
		exhaustMap(() => this.marketService.getMarketLatest().pipe(
			map((assets) => marketActions.marketTableSuccess({assets})),
			catchError((error) => of(marketActions.marketTableError()))
		))
	));

	constructor(
		private marketService: MarketService,
		private actions$: Actions, 
		private router: Router
	) {}
}