interface marketAsset {
	id: number;
	name: string;
	symbol: string;
	sparklinesImgUrl: string;
	max_supply: number;
	total_supply: number;
	supplyPercent: number;
	price: number;
	volume_24h: number;
	volume_change_24h: number;
	percent_change_24h: number;
	market_cap: number;
	market_cap_dominance: number;
	rank: number;
}

interface marketAssetAdded {
	index: string;
	imgLogo: string;
	link: string;
	name:string;
	symbol: string;
	price: string;
	added: string;
}

interface marketData {
	marketAssets: marketAsset[];
	marketAdded: marketAssetAdded[];
	statusAssets: marketStatus;
	statusAdded: marketStatus;
	error?: string;
}

enum marketStatus {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export {
	marketData,
	marketAsset,
	marketStatus,
	marketAssetAdded
}