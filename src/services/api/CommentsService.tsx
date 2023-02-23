import request from "lib/request";

interface ICommentsParams {
	site_id?: number
	foreign_id?: string
	skip?: number
	limit?: number
	customer_id?: string
	comment?: string
	type?: string
}

const CommentsService = () => {
	const getComments = (params: ICommentsParams) => {
		return request({
			url: "/comment/pagination",
			method: "GET",
			params,
		});
	};

	const addComment = (params: ICommentsParams) => {
		return request({
			url: "/comment",
			method: "POST",
			params,
		});
	};

	return { getComments, addComment };
};

export default CommentsService
