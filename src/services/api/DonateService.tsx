import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IUserParams {
	site_id?: number
	user_id?: number
	customer_id?: string
	amount?: number
	coin_amount?: number
	money_amount?: number
	paginate?: number
	page?: number
}

const DonateService = () => {
	const donateToSpecificContentCreator = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: "/donates",
			method: "POST",
			params,
		});
	};

	const getAllDonators = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: "/donates/all-donators",
			method: "GET",
			params,
		});
	};

	const getDonatorsOfContentCreator = (params: IUserParams) => {
		return request({
			headers: getHeaders(),
			url: "/donates/list/",
			method: "GET",
			params,
		});
	};

	return { donateToSpecificContentCreator, getAllDonators, getDonatorsOfContentCreator };
};

export default DonateService;
