import { IStatus } from "../../shared/models/status.enum";
import { ITradesAdd, ITradesStoreModal } from "./trades-modal.model";


// * TRADES STORE
interface ITradesStore extends IStatus {
	error: string;
	modalStore: ITradesStoreModal
	trades : ITrade[];
}

interface ITradesInvest {
  EUR: number;
  USD: number;
  JPY: number;
}

// * TRADES GET
interface ITrade extends ITradesAdd {
	actualPrice: number;
	percentChange: number;
	quantityValue: number;
	quantityActualValue: number;
	profitLoss: number;
	_id: string;
	timeStampAdded: number;
  symbolPrice: ITradesInvest
  changed: boolean;
}

interface ITradesGetSuccess {
	userTrades: ITrade[]
}

// * TRADES DELETE
interface ITradesDeleteSuccess {
	message: string;
}

interface ITradesDeleteError extends ITradesGetError {}

// * TRADES GET ERROR
interface ITradesGetError {
	error: string;
}

enum tradeType {
	BUY = 'buy',
	SELL = 'sell'
}

interface ITradeUpdate {
  id: string,
  exchange: string;
  fromSymbol: string;
  toSymbol: string;
  price: number;
}

export {
	ITradesStore,
	ITradesGetSuccess,
	ITradesGetError,
	ITradesDeleteSuccess,
	ITradesDeleteError,
	ITrade,
  tradeType,
  ITradeUpdate,
  ITradesInvest
}