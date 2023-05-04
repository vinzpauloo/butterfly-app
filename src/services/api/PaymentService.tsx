import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IBuyBundle {
  data: {
    callbackURL: string;
    bankcode: string;
  };
  token: string;
  bundleId: string;
}

const PaymentService = (token: string) => {
  const getPaymentMethods = () => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/payment/method?paginate=false",
      method: "GET",
    });
  };

  const postBuyBundle = (params: IBuyBundle) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/buy/subscriptions/bundle/${params.bundleId}`,
      method: "POST",
      body: params.data,
    });
  };

  return {
    getPaymentMethods,
    postBuyBundle,
  };
};

export default PaymentService;
