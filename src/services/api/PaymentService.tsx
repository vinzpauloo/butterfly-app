import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

const PaymentService = (token: string) => {
  const getPaymentMethods = () => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/payment/method?paginate=false",
      method: "GET",
    });
  };

  return {
    getPaymentMethods,
  };
};

export default PaymentService;
