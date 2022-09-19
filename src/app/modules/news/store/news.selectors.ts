import { createSelector, createFeatureSelector } from "@ngrx/store";
import { News, NewsStatus } from "../models/news.model";

const newsState = createFeatureSelector<News>('news');
const isNewsLoading = createSelector(newsState, (state: News) => state.status === NewsStatus.LOADING)
const isNewsError = createSelector(newsState, (state: News) => state.status === NewsStatus.ERROR)

const getNews = createSelector(newsState, (state: News) => 
	state.news.map(feedNews => 
		feedNews.feed.map(thisNew => {
			return {
				...thisNew,
				web: feedNews.web,
				logo: feedNews.logo,
			}
		})
	)
	.reduce((prev, next) => prev.concat(next), [])
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

export {
	isNewsLoading,
	isNewsError,
	getNews
}