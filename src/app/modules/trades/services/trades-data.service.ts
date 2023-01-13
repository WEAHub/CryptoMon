import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITrade, ITradesInvest } from '../models/trades.model';

@Injectable()

export class TradesDataService {

  private dataSource: BehaviorSubject<ITradesInvest> = new BehaviorSubject<ITradesInvest>(<ITradesInvest>{});
  investData: Observable<ITradesInvest> = this.dataSource.asObservable();


  private alertsSource: BehaviorSubject<ITrade[]> = new BehaviorSubject<ITrade[]>(<ITrade[]>[]);
  alertsData: Observable<ITrade[]> = this.alertsSource.asObservable();

  constructor() {}

  updateInvest(newInvestData: ITradesInvest) {
    this.dataSource.next(newInvestData)
  }

  updateAlerts(newAlerts: ITrade[]) {
    this.alertsSource.next(newAlerts)
  }

}