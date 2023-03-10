import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IFeed {
	site_id?: number;
	user_id?: number
	tag?: string
	with?: string
	page?: number
	ads?: boolean
	latest?: boolean
	video_only?: boolean
	images_only?: boolean
	services_only?: boolean
	featured?: boolean
	recommended?: boolean
}

const FeedService = () => {
	const getFeeds = (params: IFeed) => {
		return request({
			headers: getHeaders(),
			url: "/feeds",
			method: "GET",
			params,
		});
	};

	const getFeaturedFeeds = (params: IFeed) => {
		return request({
			headers: getHeaders(),
			url: "/feeds/featured",
			method: "GET",
		});
	};

	const getSpecificFeed = (params: IFeed) => {
		return request({
			headers: getHeaders(),
			url: `/feeds/${params}`,
			method: "GET",
		});
	};
	
	return { getFeeds, getFeaturedFeeds, getSpecificFeed };
};

export default FeedService;
