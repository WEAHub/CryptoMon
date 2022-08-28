import { assertPlatform } from "@angular/core";
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { marketData, marketAsset, marketStatus } from "../models/market-table.model";

const marketState = createFeatureSelector<marketData>('market');

const isMarketTableLoading = createSelector(
	marketState,
	(state: marketData) => state.status === marketStatus.LOADING
)

const getMarketState = createSelector(
	marketState,
	(state: marketData) => state.data.map((asset, index) => {
		return {
			...asset,
			percent_change_24h: +asset.percent_change_24h.toFixed(2),
			supplyPercent: asset.max_supply !== null ? Math.floor((100 * asset.total_supply) / asset.max_supply) : 0,
			rank: index
		}
	})
)

export {
	isMarketTableLoading,
	getMarketState
}