import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as tradesActions from './trades.actions'
import * as userActions from '@modules/core/store/core-user.actions'

import { TradesService } from '../services/trades.service';
import { 
	ITradesAdd,
	ITradesModalError, 
	ITradesModalExchangeSuccess,
	ITradesModalPairLoad, 
	ITradesModalPairSuccess, 
	ITradesModalPriceLoad, 
	ITradesModalPriceSuccess,
  ITradesModify,
  ITradesModalSuccess
} from '../models/trades-modal.model';

import { 
  IAlertAdd,
  IAlertsList, 
  ITrade, 
  ITradeAlertFinished, 
  ITradesDeleteError, 
  ITradesGetError, 
  ITradesGetSuccess 
} from '../models/trades.model';


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
			switchMap((payload: ITradesModalSuccess) => of(
				tradesActions.tradesAddSuccess(payload),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesAddError(error)))
		))
	))

  tradeModify$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesModify),
		exhaustMap((action: ITradesModify) => this.tradesService.modifyTrade(action).pipe(
			switchMap((payload: ITradesModalSuccess) => of(
				tradesActions.tradesAddSuccess(payload),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesModalError) => of(tradesActions.tradesAddError(error)))
		))
	))

	getTrades$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesGet),
		exhaustMap(() => this.tradesService.getTrades().pipe(
			switchMap((payload: ITradesGetSuccess) => of(
				tradesActions.tradesGetSuccess(payload),
				userActions.getUserStats(),
			)),
			catchError((error: ITradesGetError) => of(tradesActions.tradesGetError(error)))
		))
	))

	deleteTrade$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.tradesDelete),
		exhaustMap((action: ITrade) => this.tradesService.deleteTrade(action).pipe(
			switchMap((message: ITradesModalSuccess) => of(
				tradesActions.tradesAddSuccess(message),
				tradesActions.tradesGet()
			)),
			catchError((error: ITradesDeleteError) => of(tradesActions.tradesDeleteError(error)))
		))
	))

	getAlertList$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.getAlertList),
		exhaustMap(() => this.tradesService.getAlertList().pipe(
			map((alertList: IAlertsList) => tradesActions.getAlertListSuccess(alertList)),
			catchError((error: ITradesModalError) => of(tradesActions.getAlertListError(error)))
		))
	))

  addAlert$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.addAlert),
		exhaustMap((alertData: IAlertAdd) => this.tradesService.addAlert(alertData).pipe(
			map((message: ITradesModalSuccess) => tradesActions.addAlertSuccess(message)),
			catchError((error: ITradesModalError) => of(tradesActions.addAlertError(error)))
		))
	))

  finishAlert$ = createEffect(() => this.actions$.pipe(
		ofType(tradesActions.alertFinished),
		exhaustMap((alertData: ITradeAlertFinished) => this.tradesService.finishAlert(alertData).pipe(
      switchMap((message: ITradesModalSuccess) => of(
				tradesActions.alertFinishedSuccess(message),
				tradesActions.tradesGet()
      )),
			catchError((error: ITradesModalError) => of(tradesActions.alertFinishedError(error)))
		))
	));
  
	constructor(
		private tradesService: TradesService,
		private actions$: Actions,
	) {}
}