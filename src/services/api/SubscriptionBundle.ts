import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAllSubscriptionBundle {
  data: {
    active: boolean;
  };
  token: string;
}

const SubscriptionsBundle = () => {
  const getAllSubscriptionBundle = (params: IAllSubscriptionBundle) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/subscriptions",
      method: "GET",
      params: params.data,
    });
  };

  return {
    getAllSubscriptionBundle,
  };
};

export default SubscriptionsBundle;
