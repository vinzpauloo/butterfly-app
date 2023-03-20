import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IUserParams {
	data: {
		site_id?: number
		user_id?: number
		customer_id?: string
		amount?: number
		coin_amount?: number
		money_amount?: number
		paginate?: number
		page?: number
	},
	token: string
}

const DonateService = () => {
	const donateToSpecificContentCreator = (params: IUserParams) => {
		return request({
			headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
			url: "/donates",
			method: "POST",
			params: params.data,
		});
	};

	const getAllDonators = (params: IUserParams) => {
		return request({
			headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
			url: "/donates/all-donators",
			method: "GET",
			params: params.data,
		});
	};

	const getDonatorsOfContentCreator = (params: IUserParams) => {
		return request({
			headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
			url: "/donates/list/",
			method: "GET",
			params: params.data,
		});
	};

	return { donateToSpecificContentCreator, getAllDonators, getDonatorsOfContentCreator };
};

export default DonateService;
