import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IFavoritesOrWatchedHistory {
  customer_id: string;
  limit: number;
  type: "favorites" | "watched_history";
}

interface ICommons {
  customer_id?: string;
  site_id?: number;
}

interface IFollow extends ICommons {
  user_id: { user_id: string | number } /* Content creator ID */;
  token?: string;
}

interface IFavorite {
  data: { foreign_id: string } /* Work ID */;
  token: string;
}

interface ISubscription {
  data: { amount: number; title: string };
  token: string;
}

interface INewCustomer {
  device: {
    type: string;
    active: boolean;
    device_id?: string;
  };
}

interface IExistingCustomer extends INewCustomer {
  token: string;
}

const CustomerService = () => {
  const getCustomerById = (customer_id: string) => {
    return request({
      headers: getHeaders(),
      url: `/customers/details/${customer_id}`,
      method: "GET",
    });
  };

  const postLoginCustomer = (data: IExistingCustomer) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${data.token}`,
      },
      url: "/customers/login/device",
      method: "POST",
      data: { device: data.device },
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
      headers: { ...getHeaders(), Authorization: `Bearer ${data.token}` },
      url: "/customers/follow-checker",
      method: "POST",
      data: data.user_id,
    });
  };

  const followCreator = (data: IFollow) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${data.token}` },
      url: "/customers/follow-creator",
      method: "POST",
      data: data.user_id,
    });
  };

  const unfollowCreator = (data: IFollow) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${data.token}` },
      url: `/customers/unfollow-creator/`,
      method: "DELETE",
      data: data.user_id,
    });
  };

  const favoriteChecker = (params: IFavorite) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/customers/favorite-checker",
      method: "POST",
      data: params.data,
    });
  };

  const favoriteVideo = (params: IFavorite) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/customers/save-favorite",
      method: "POST",
      data: params.data,
    });
  };

  const unfavoriteVideo = (params: IFavorite) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/customers/remove-favorite",
      method: "DELETE",
      params: params.data,
    });
  };

  const subscribeToVIP = (params: ISubscription) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/customers/subscription",
      method: "POST",
      data: params.data,
    });
  };

  const bindDevice = (params) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/customers/bind",
      method: "POST",
      params: params.data,
    });
  };

  return {
    getCustomerById,
    postLoginCustomer,
    postNewCustomer,
    getFollowedCreators,
    getFavoritesOrWatchedHistory,
    followChecker,
    followCreator,
    unfollowCreator,
    favoriteChecker,
    favoriteVideo,
    unfavoriteVideo,
    subscribeToVIP,
    bindDevice,
  };
};

export default CustomerService;
