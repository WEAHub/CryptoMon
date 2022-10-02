import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as tradesActions from './trades.actions'
import { TradesService } from '../services/trades.service';
import { 
	ITradesAdd,
	ITradesAddSuccess,
	ITradesModalError, 
	ITradesModalExchangeSuccess,
	ITradesModalPairLoad, 
	ITradesModalPairSuccess, 
	ITradesModalPriceLoad, 
	ITradesModalPriceSuccess,
  ITradesModify
} from '../models/trades-modal.model';
import { ITrade, ITradesDeleteError, ITradesDeleteSuccess, ITradesGetError, ITradesGetSuccess } from '../models/trades.model';


@Injectable()

export class TradesEffects {
	
	getAllExchanges$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesModalLoadExchanges),
		exhaustMap(() => this.tradesService.getAllExchanges().pipe(
			map((exchanges: ITradesModalExchangeSuccess) => tradesActions.tradesModalLoadExchangesSuccess(exchanges)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesModalLoadExchangesError(error)))
		))
	))

	getPairByExchange$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesModalLoadPairs),
		exhaustMap((action: ITradesModalPairLoad) => this.tradesService.getPairsByExchange(action).pipe(
			map((pairs: ITradesModalPairSuccess) => tradesActions.tradesModalLoadPairsSuccess(pairs)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesModalLoadPairsError(error)))
		))
	))

	getPriceByExchangeTS$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesModalLoadPrice),
		exhaustMap((action: ITradesModalPriceLoad) => this.tradesService.getPriceByExchangeTS(action).pipe(
			map((price: ITradesModalPriceSuccess) => tradesActions.tradesModalLoadPriceSuccess(price)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesModalLoadPriceError(error)))
		))
	))

	tradeAdd$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesAdd),
		exhaustMap((action: ITradesAdd) => this.tradesService.addTrade(action).pipe(
			switchMap((payload: ITradesAddSuccess) => of(
				tradesActions.tradesAddSuccess(payload),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesAddError(error)))
		))
	))

  tradeModify$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesModify),
		exhaustMap((action: ITradesModify) => this.tradesService.modifyTrade(action).pipe(
			switchMap((payload: ITradesAddSuccess) => of(
				tradesActions.tradesAddSuccess(payload),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesAddError(error)))
		))
	))

	getTrades$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesGet),
		exhaustMap(() => this.tradesService.getTrades().pipe(
			map((trades: ITradesGetSuccess) => tradesActions.tradesGetSuccess(trades)),
			catchError((error: ITradesGetError) => of(tradesActions.tradesGetError(error)))
		))
	))

	deleteTrade$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesDelete),
		exhaustMap((action: ITrade) => this.tradesService.deleteTrade(action).pipe(
			switchMap((message: ITradesDeleteSuccess) => of(
				tradesActions.tradesAddSuccess(message),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesDeleteError) => of(tradesActions.tradesDeleteError(error)))
		))
	))

	constructor(
		private tradesService: TradesService,
		private actions$: Actions,
	) {}
}