import { createAction, props } from '@ngrx/store';
import { FeedNews } from '../models/news.model';

enum ActionTypes {
  NEWS_REQUEST = '[News] Getting News',
  NEWS_REQUEST_SUCCESS = '[News] Getting News Success',
  NEWS_REQUEST_ERROR = '[News] Getting News Error',
  NEWS_RESET = '[News] Reset news',
}

const newsStart = createAction(ActionTypes.NEWS_REQUEST);
const newsSuccess = createAction(ActionTypes.NEWS_REQUEST_SUCCESS, props<{news: Array<FeedNews>}>());
const newsError = createAction(ActionTypes.NEWS_REQUEST_ERROR);

const resetStateNews = createAction(ActionTypes.NEWS_RESET);

export {
	newsStart,
	newsSuccess,
	newsError,
	resetStateNews
}