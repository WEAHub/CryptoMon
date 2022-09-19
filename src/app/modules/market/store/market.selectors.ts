import { state } from "@angular/animations";
import { assertPlatform } from "@angular/core";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { marketData, marketAsset, marketStatus } from "../models/market-table.model";

const marketState = createFeatureSelector<marketData>('market');

const isMarketTableLoading = createSelector(
	marketState,
	(state: marketData) => state.statusAssets === marketStatus.LOADING
)

const isMarketTableAddedLoading = createSelector(
	marketState,
	(state: marketData) => state.statusAdded === marketStatus.LOADING
)

const isMarketTableLoaded = createSelector(
	marketState,
	(state: marketData) => state.statusAssets === marketStatus.LOADED
)

const isMarketTableAddedLoaded = createSelector(
	marketState,
	(state: marketData) => state.statusAdded === marketStatus.LOADED
)
const getMarketState = createSelector(
	marketState,
	(state: marketData) => state.marketAssets.map((asset, index) => {
		return {
			...asset,
			percent_change_24h: +asset.percent_change_24h.toFixed(2),
			supplyPercent: asset.max_supply !== null ? Math.floor((100 * asset.total_supply) / asset.max_supply) : 0,
			rank: index
		}
	})
)

const getMarketAddedState = createSelector(
	marketState,
	(state: marketData) => state.marketAdded
)

const marketHasError = createSelector(
	marketState,
	(state: marketData) => state.statusAdded == marketStatus.ERROR || state.statusAssets == marketStatus.ERROR
)

const getMarketError = createSelector(
	marketState,
	(state: marketData) => state.error
)

export {
	isMarketTableLoading,
	isMarketTableAddedLoading,
	getMarketAddedState,
	getMarketState,
	marketHasError,
	getMarketError,
	isMarketTableLoaded,
	isMarketTableAddedLoaded
}