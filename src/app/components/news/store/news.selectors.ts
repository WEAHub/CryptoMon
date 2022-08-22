import { createSelector, createFeatureSelector } from "@ngrx/store";
import { New, FeedNews, News, NewsStatus } from "../models/news.model";

const newsState = createFeatureSelector<News>('news');
const isNewsLoading = createSelector(newsState, (state: News) => state.status === NewsStatus.LOADING)
//const getNews = createSelector(newsState, (state: News) => state.news)

const getNews = createSelector(newsState, (state: News) => {
	return state.news.map((feedNews) => {
		return feedNews.feed.map((thisNew) => {
			return {
				...thisNew,
				web: feedNews.web,
				logo: feedNews.logo,
			}
		})
	})
	.reduce((prev, next) => prev.concat(next), [])
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export {
	isNewsLoading,
	getNews
}