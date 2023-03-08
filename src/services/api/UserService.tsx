import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IUserParams {
	user_id?: number
	paginate?: number
}

const UserService = () => {
	const getSpecificContentCreator = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: `/content-creators/${params.user_id}`,
			method: "GET",
		});
	};

	const getAllFollowerList = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: "/followers/list",
			method: "GET",
			params,
		});
	};

	const getFollowersCount = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: `/followers/count/${params.user_id}`,
			method: "GET",
		});
	};

	const getDonatorsCount = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: `/customers/total-donators/${params.user_id}`,
			method: "GET",
		});
	};

	return { getSpecificContentCreator, getAllFollowerList, getFollowersCount, getDonatorsCount };
};

export default UserService;
