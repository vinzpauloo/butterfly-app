import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IFavoritesOrWatchedHistory {
  customer_id: string;
  limit: number;
  type: "favorites" | "watched_history";
}

interface ICommons {
  customer_id: string;
  site_id?: number;
}

interface IFollow extends ICommons {
  user_id: string | number /* Content creator ID */;
}

interface IFavorite extends ICommons {
  foreign_id: string /* Work ID */;
}

interface INewCustomer {
  device: {
    type: string;
    active: boolean;
    deviceId?: string;
  };
}

const CustomerService = () => {
  const getCustomerById = (customer_id: string) => {
    return request({
      headers: getHeaders(),
      url: `/customers/details/${customer_id}`,
      method: "GET",
    });
  };

  const postNewCustomer = (data: INewCustomer) => {
    return request({
      headers: getHeaders(),
      url: "/customers/register/device",
      method: "POST",
      data,
    });
  };

  const getFollowedCreators = (customer_id: string) => {
    return request({
      headers: getHeaders(),
      url: `/customers/followed-creators/${customer_id}`,
      method: "GET",
    });
  };

  const getFavoritesOrWatchedHistory = (params: IFavoritesOrWatchedHistory) => {
    return request({
      headers: getHeaders(),
      url: "/customers/favorites-watched-history",
      method: "GET",
      params,
    });
  };

  const followChecker = (data: IFollow) => {
    return request({
      headers: getHeaders(),
      url: "/customers/follow-checker",
      method: "POST",
      data,
    });
  };

  const followCreator = (data: IFollow) => {
    return request({
      headers: getHeaders(),
      url: "/customers/follow-creator",
      method: "POST",
      data,
    });
  };

  const unfollowCreator = (data: IFollow) => {
    return request({
      headers: getHeaders(),
      url: `/customers/unfollow-creator/${data.user_id}/${data.customer_id}`,
      method: "DELETE",
    });
  };

  const favoriteChecker = (data: IFavorite) => {
    return request({
      headers: getHeaders(),
      url: "/customers/favorite-checker",
      method: "POST",
      data,
    });
  };

  const favoriteVideo = (data: IFavorite) => {
    return request({
      headers: getHeaders(),
      url: "/customers/save-favorite",
      method: "POST",
      data,
    });
  };

  const unfavoriteVideo = (data: IFavorite) => {
    return request({
      headers: getHeaders(),
      url: `/customers/remove-favorite/${data.foreign_id}/${data.customer_id}`,
      method: "DELETE",
    });
  };

  return {
    getCustomerById,
    postNewCustomer,
    getFollowedCreators,
    getFavoritesOrWatchedHistory,
    followChecker,
    followCreator,
    unfollowCreator,
    favoriteChecker,
    favoriteVideo,
    unfavoriteVideo,
  };
};

export default CustomerService;
