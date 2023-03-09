import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ILike {
	site_id?: number;
	foreign_id?: string;
	customer_id?: string;
	type?: string;
}

const FeedService = () => {
	const likeWork = (params: ILike) => {
		return request({
			headers: getHeaders(),
			url: "/likes",
			method: "POST",
			params,
		});
	};

	const unlikeWork = (data: ILike) => {
		return request({
			headers: getHeaders(),
			url: `/likes/${data.foreign_id}/${data.customer_id}`,
			method: "DELETE",
		});
	};

	const likeChecker = (params: ILike) => {
		return request({
			headers: getHeaders(),
			url: "/likes/checker",
			method: "POST",
			params,
		});
	};

	const likesCount = (data: ILike) => {
		return request({
			headers: getHeaders(),
			url: `/likes/count/${data.foreign_id}`,
			method: "GET",
		});
	};

	return { likeWork, unlikeWork, likeChecker, likesCount };
};

export default FeedService;
