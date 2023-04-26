import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAllCoinBundle {
  data: {
    with: string;
  };
  token: string;
}

const CoinsBundle = () => {
  const getAllCoinBundle = (params: IAllCoinBundle) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/coins",
      method: "GET",
      params: params.data,
    });
  };

  return {
    getAllCoinBundle,
  };
};

export default CoinsBundle;
