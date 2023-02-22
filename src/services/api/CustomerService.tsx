import request from "lib/request";

interface IFavoritesOrWatchedHistory {
  customer_id: string;
  limit: number;
  type: "favorites" | "watched_history";
}

const CustomerService = () => {
  const getCustomerById = (customer_id: string) => {
    return request({
      url: `/customer/details/${customer_id}`,
      method: "GET",
    });
  };

  const getFollowedCreators = (customer_id: string) => {
    return request({
      url: `/customer/followed-creators/${customer_id}`,
      method: "GET",
    });
  };

  const getFavoritesOrWatchedHistory = (params: IFavoritesOrWatchedHistory) => {
    return request({
      url: "/customer/favorites-watched-history",
      method: "GET",
      params,
    });
  };

  return { getCustomerById, getFollowedCreators, getFavoritesOrWatchedHistory };
};

export default CustomerService;
