import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IPostDonateParams {
  data: {
    user_id: number;
    amount: number;
    message?: string;
  };
  token: string;
}

const DonateService = () => {
  const postDonate = (params: IPostDonateParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/donations",
      method: "POST",
      data: params.data,
    });
  };

  return { postDonate };
};

export default DonateService;
