import { createReducer, on } from '@ngrx/store';
import { EStatus } from '../../shared/models/status.enum';
import { ITradesModalError, ITradesModalPairSuccess, ITradesModalPriceSuccess, ITradesModalSuccess } from '../models/trades-modal.model';
import { IAlertsList, ITradeAlertFinished, ITradesGetError, ITradesGetSuccess, ITradesStore } from '../models/trades.model';
import { calcTotalInvest, processTrades, updateTrades } from '../utils/trade.functions';
import * as tradesActions from './trades.actions';

const initialState: ITradesStore = {
	error: '',
	status: EStatus.UNINITIALIZED,
  message: '',
	trades: [],
  alerts: {
    loaded: false,
    alertList: [],
    error: '',
  },
	modalStore: {
		loading: false,
		exchanges: [],
		pairs: [],
		price: 0,
		toSymbolPrice: '',
		error: '',
	},
}

const tradesReducer = createReducer(
	initialState,
  // ! TRADES ADD MODAL
	on(tradesActions.tradesModalLoadExchanges, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: true,
				exchanges: [],
				price: 0,
				toSymbolPrice: '',
				pairs: [],
				error: '',
			}
		}
	}),
	on(tradesActions.tradesModalLoadExchangesSuccess, (state, payload) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: false,
				exchanges: payload.exchanges,
				pairs: [],
				error: '',
			}
		}
	}),
	on(tradesActions.tradesModalLoadExchangesError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: false,
				exchanges: [],
				pairs: [],
				error: payload.error,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairs, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: true,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairsSuccess, (state, payload: ITradesModalPairSuccess) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				pairs: payload.pairs,
				loading: false,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairsError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				pairs: [],
				loading: false,
				error: payload.error
			}
		}
	}),
	on(tradesActions.tradesModalLoadPrice, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: 0,
				toSymbolPrice: '',
				loading: true,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPriceSuccess, (state, payload: ITradesModalPriceSuccess) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: payload.price,
				toSymbolPrice: payload.toSymbol,
				loading: false,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPriceError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: 0,
				toSymbolPrice: '',
				loading: false,
				error: payload.error
			}
		}
	}),
  // ! TRADES TABLE
	on(tradesActions.tradesGet, (state) => {
		return {
			...state,
			status: EStatus.LOADING
		}
	}),
	on(tradesActions.tradesGetSuccess, (state, payload: ITradesGetSuccess) => {
		return {
			...state,
			status: EStatus.LOADED,
			trades: processTrades(payload.userTrades),
		}
	}),
	on(tradesActions.tradesGetError, (state, payload: ITradesGetError) => {
		return {
			...state,
			status: EStatus.ERROR,
			error: payload.error
		}
	}),
  // ! ALERTS
  // GET ALERTS
  on(tradesActions.getAlertList, (state) => {
    return {
      ...state,    
      alerts: {
        alertList: [],
        error: '',
        loaded: false,
      }
    }
  }),
  on(tradesActions.getAlertListError, (state, payload: ITradesModalError) => {
    return {
      ...state,    
      alerts: {
        alertList: [],
        error: payload.error,
        loaded: false,
      }
    }
  }),
  on(tradesActions.getAlertListSuccess, (state, payload: IAlertsList) => {
    return {
      ...state,    
      alerts: {
        alertList: payload.alertList,
        error: '',
        loaded: true,
      }
    }
  }),

  // ADD ALERT
  on(tradesActions.addAlert, (state) => {
    return {
      ...state,
      message: ''
    }
  }),
  on(tradesActions.addAlertError, (state, payload: ITradesModalError) => {
    return {
      ...state,
      message: 'Error during adding alert'  
    }
  }),
  on(tradesActions.addAlertSuccess, (state, payload: ITradesModalSuccess) => {
    return {
      ...state,
      message: 'Alert added successfully'
    }
  }),
  // FINISH ALERT
  
  on(tradesActions.alertFinished, (state) => {
    return {
      ...state,
      message: ''
    }
  }),
  on(tradesActions.alertFinishedError, (state, payload: ITradesModalError) => {
    return {
      ...state,
      message: 'Error finishing alert'  
    }
  }),
  on(tradesActions.alertFinishedSuccess, (state) => {
    return {
      ...state,
      message: 'Alert finished successfully'
    }
  }),
  on(tradesActions.showSnackBarMsg, (state, payload) => {
    return {
      ...state,
      message: payload.message
    }
  }),
  // ! RESET
	on(tradesActions.resetStateTradesModal, () => {
		return Object.assign({}, initialState)
	}),
);

export {
	tradesReducer
}
