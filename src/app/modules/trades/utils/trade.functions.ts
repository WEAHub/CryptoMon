import { ITrade, ITradesInvest, ITradeUpdate, tradeType } from '../models/trades.model'

function calcPercentageChange(trade: ITrade): number {

  const tradeDirection = trade.tradeType == tradeType.BUY
  
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

function processTrades(userTrades: ITrade[]): ITrade[] {
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
    const updatedTrade = update.filter(v => v.id == trade._id)[0]
    return {
      ...trade,
      actualPrice: updatedTrade.price,
      changed: trade.actualPrice !== updatedTrade.price
    }
  })

  return trades;
}

export {
  calcPercentageChange,
  calcTotalInvest,
  processTrades,
  updateTrades
}