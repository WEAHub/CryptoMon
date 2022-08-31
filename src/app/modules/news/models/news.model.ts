interface News {
	news: Array<FeedNews>;
	status: string
}

interface FeedNews {
	name: string;
	web: string;
	logo: string;
	feed: Array<New>;
}

interface New {
  title: string;
	link: string;
	imageUrl: string;
	date: string;
	description: string;
	author: string;
	logo: string;
}

enum NewsStatus {
  UNINITIALIZED = 'uninitialized',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error'
}

export {
  News,
	New,
	NewsStatus,
	FeedNews
}