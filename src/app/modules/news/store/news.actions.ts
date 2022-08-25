import { createAction, props } from '@ngrx/store';
import { FeedNews } from '../models/news.model';

enum ActionTypes {
  NEWS_REQUEST = '[News] Getting News',
  NEWS_REQUEST_SUCCESS = '[News] Getting News Success',
  NEWS_REQUEST_ERROR = '[News] Getting News Error'
}

const newsStart = createAction(ActionTypes.NEWS_REQUEST);
const newsSuccess = createAction(ActionTypes.NEWS_REQUEST_SUCCESS, props<{news: Array<FeedNews>}>());
const newsError = createAction(ActionTypes.NEWS_REQUEST_ERROR);

export {
	newsStart,
	newsSuccess,
	newsError
}