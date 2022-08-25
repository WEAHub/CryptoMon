import { state } from '@angular/animations';
import { createReducer, on, Action } from '@ngrx/store';
import { News, New, NewsStatus } from '../models/news.model';
import * as newsActions from './news.actions';

const initialState: News = {
	news: [],
	status: NewsStatus.UNINITIALIZED
}

const newsReducer = createReducer(
	initialState,
	on(newsActions.newsStart, (state) => {
		return {
			...state,
			status: NewsStatus.LOADING
		}
	}),
	on(newsActions.newsSuccess, (state, payload) => {
		return {
			...state,
			news: payload.news,
			status: NewsStatus.LOADED
		}
	}),
	on(newsActions.newsError, (state) => state),
);

export {
	newsReducer
}
