import { AnyFn } from '@ngrx/store/src/selector'
import { ITrade, ITradesInvest, ITradeUpdate, ETradeType, EAlertStatus } from '../models/trades.model'

function calcPercentageChange(trade: ITrade): number {

  const tradeDirection = trade.tradeType == ETradeType.BUY
  
  const tradePriceAction = tradeDirection 
  ? trade.actualPrice > trade.price
  : trade.actualPrice < trade.price
  
  const percentChange = 100 * Math.abs(
    (trade.actualPrice - trade.price) / ((trade.actualPrice + trade.price) / 2)
  )

  const minusAdd = (!tradePriceAction ? '-' : '')

  return Number(minusAdd + percentChange.toFixed(2));

}

function calcTotalInvest(trades: ITrade[]): ITradesInvest {
  return trades.reduce((prev, next) => {
    return {
      USD: prev.USD + (next.symbolPrice.USD * next.quantity),
      EUR: prev.EUR + (next.symbolPrice.EUR * next.quantity),
      JPY: prev.JPY + (next.symbolPrice.JPY * next.quantity),
    }
  },{ USD: 0, EUR: 0, JPY: 0 })
}

function processTrades(userTrades: any): ITrade[] {
  return userTrades.map((trade: ITrade) => {
    const quantityValue = trade.price * trade.quantity
    const quantityActualValue = trade.actualPrice * trade.quantity
    return {
      ...trade,
      percentChange: calcPercentageChange(trade),
      profitLoss: Math.abs(quantityActualValue - quantityValue),
      quantityValue,
      quantityActualValue,
      changed: trade.changed ?? false
    }
  })
}

function updateTrades(userTrades: ITrade[], update: ITradeUpdate[]): ITrade[] {
  const trades = userTrades.map(trade => {
    const updatedTrade = update.find(v => v.id == trade._id)
      
    let _update = typeof(updatedTrade?.price) === undefined || updatedTrade?.price === -1 
    ? trade 
    : {
      ...trade,
      actualPrice: updatedTrade?.price,
      changed: trade.actualPrice !== updatedTrade?.price
    }
    
    if(updatedTrade?.alert !== undefined) {
      _update = {
        ..._update,
        alert: updatedTrade?.alert
      }
    }

    return _update

  })

  return processTrades(trades);
}

function checkAlerts(userTrades: ITrade[]) {
  return userTrades.filter(trade => trade.alert?.status === EAlertStatus.PENDING)
}

function compareObjectsEqual(firstObject: Object, secondObject: Object) {
  return JSON.stringify(firstObject) === JSON.stringify(secondObject)
}

export {
  compareObjectsEqual,
  calcPercentageChange,
  calcTotalInvest,
  processTrades,
  updateTrades,
  checkAlerts
}