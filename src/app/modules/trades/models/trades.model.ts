import { IStatus } from "../../shared/models/status.enum";
import { ITradesAdd, ITradesStoreModal } from "./trades-modal.model";


// * TRADES STORE
interface ITradesStore extends IStatus {
  message: string;
	error: string;
	modalStore: ITradesStoreModal;
	trades : ITrade[];
  alerts: {
    alertList: IAlertListItem[];
    error: string;
    loaded: boolean;
  }
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
  symbolPrice: ITradesInvest;
  changed: boolean;
  percentType: string;
  alert?: ITradeAlert;
  pricesOnAdd: ITradesInvest;
}

interface ITradesGetSuccess {
	userTrades: ITrade[]
}

interface ITradesDeleteError extends ITradesGetError {}

// * TRADES GET ERROR
interface ITradesGetError {
	error: string;
}

enum ETradeType {
	BUY = 'buy',
	SELL = 'sell'
}

interface ITradeUpdate {
  id: string,
  exchange: string;
  fromSymbol: string;
  toSymbol: string;
  price: number;
  alert?: ITradeAlert;
}

// * ALERTS LIST

interface IAlertsList {
  alertList: IAlertListItem[]
}

interface IAlertListItem {
  name: string;
  description: string;
  inputs: IAlertListItemInput[];
}

interface IAlertListItemInput {
  name: string;
  type: string;
  title: string;
  value: string;
}

interface IAlertAdd {
  tradeId: string;
  alertType: string;
  data: IAlertAddInputs[];
}

interface IAlertAddInputs {
  name: string;
  value: string;
}

interface ITradeAlert {
  alertType: string;
  data: IAlertAddInputs[];
  _id: string;
  status: string;
}

enum EAlertStatus {
  RUNNING = 'RUNNING',
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
}

interface ITradeAlertFinished {
  tradeId: string;
  alertId?: string;
}

export {
	ITradesStore,
	ITradesGetSuccess,
	ITradesGetError,
	ITradesDeleteError,
	ITrade,
  ETradeType,
  ITradeUpdate,
  ITradesInvest,
  IAlertsList,
  IAlertListItem,
  IAlertAdd,
  IAlertAddInputs,
  ITradeAlertFinished,
  EAlertStatus
}