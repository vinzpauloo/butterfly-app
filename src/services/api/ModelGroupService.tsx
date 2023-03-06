import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ICommentsParams {
	
}

const ModelGroupService = () => {
	const getAllModelGroup = (params: ICommentsParams) => {
		return request({
			headers: getHeaders(),
			url: "model-groups",
			method: "GET",
			params,
		});
	};

	return { getAllModelGroup };
};

export default ModelGroupService;
