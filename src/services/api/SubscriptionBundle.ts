import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAllSubscriptionBundle {
  token: string;
}

const SubscriptionsBundle = () => {
  const getAllSubscriptionBundle = (params: IAllSubscriptionBundle) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/subcriptions",
      method: "GET",
    });
  };

  return {
    getAllSubscriptionBundle,
  };
};

export default SubscriptionsBundle;
