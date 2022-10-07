import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITradesInvest } from '../models/trades.model';

@Injectable()

export class TradesDataService {

  private dataSource: BehaviorSubject<ITradesInvest> = new BehaviorSubject<ITradesInvest>({ 
    EUR: 0,
    USD: 0,
    JPY: 0
  });

  investData: Observable<ITradesInvest> = this.dataSource.asObservable();

  constructor() {}

  updateInvest(newInvestData: ITradesInvest): void {
    this.dataSource.next(newInvestData)
  }
}