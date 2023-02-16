import request from "lib/request";

export const Favorite = () => {
  const postSaveFavorite = (data) => {
    return request({
      url: "/customer/save-favorite",
      method: "POST",
      data: data,
    });
  };

  const postFavoriteChecker = (data) => {
    return request({
      url: "/customer/favorite-checker",
      method: "POST",
      data: data,
    });
  };

  const deleteRemoveFavorite = (data) => {
    const { foreign_id, customer_id } = data;
    return request({
      url: `customer/remove-favorite/${foreign_id}/${customer_id}`,
      method: "DELETE",
    });
  };

  return { postSaveFavorite, postFavoriteChecker, deleteRemoveFavorite };
};
