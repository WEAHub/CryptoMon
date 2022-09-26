import { ITradesStoreModal } from "./trades-modal.model";

interface ITradesStore {
	modalStore: ITradesStoreModal
	loading: boolean;
}

export {
	ITradesStore,
}