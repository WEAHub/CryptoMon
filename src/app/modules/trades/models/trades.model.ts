import { IStatus } from "../../shared/models/status.enum";
import { ITradesAdd, ITradesStoreModal } from "./trades-modal.model";


// * TRADES STORE
interface ITradesStore extends IStatus {
	error: string;
	modalStore: ITradesStoreModal
	trades : ITrade[];
  totalInvested: {
    USD: number;
    EUR: number;
    JPY: number;
  };
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
  symbolPrice: {
    EUR: number;
    USD: number;
    JPY: number;
  }
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

export {
	ITradesStore,
	ITradesGetSuccess,
	ITradesGetError,
	ITradesDeleteSuccess,
	ITradesDeleteError,
	ITrade
}