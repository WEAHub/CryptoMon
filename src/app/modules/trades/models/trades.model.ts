import { IStatus } from "../../shared/models/status.enum";
import { ITradesAdd, ITradesStoreModal } from "./trades-modal.model";


// * TRADES STORE
interface ITradesStore extends IStatus {
	error: string;
	modalStore: ITradesStoreModal
	trades : ITrade[];
}

// * TRADES GET
interface ITrade extends ITradesAdd {
	ccMapId: number;
	ccMapExchangeId: number;
	actualPrice: number;
	percentChange: number;
	quantityValue: number;
	quantityActualValue: number;
	profitLoss: number;
	_id: string;
	timeStampAdded: number;
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