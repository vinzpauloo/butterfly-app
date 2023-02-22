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
  user_id: string /* Content creator ID */;
}

interface IFavorite extends ICommons {
  foreign_id: string /* Work ID */;
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

  const followChecker = (data: IFollow) => {
    return request({
      url: "/customer/follow-checker",
      method: "POST",
      data,
    });
  };

  const followCreator = (data: IFollow) => {
    return request({
      url: "/customer/follow-creator",
      method: "POST",
      data,
    });
  };

  const unfollowCreator = (data: IFollow) => {
    return request({
      url: `/customer/unfollow-creator/${data.user_id}/${data.customer_id}`,
      method: "DELETE",
    });
  };

  const favoriteChecker = (data: IFavorite) => {
    return request({
      url: "/customer/favorite-checker",
      method: "POST",
      data,
    });
  };

  const favoriteVideo = (data: IFavorite) => {
    return request({
      url: "/customer/save-favorite",
      method: "POST",
      data,
    });
  };

  const unfavoriteVideo = (data: IFavorite) => {
    return request({
      url: `/customer/remove-favorite/${data.foreign_id}/${data.customer_id}`,
      method: "DELETE",
    });
  };

  return {
    getCustomerById,
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
