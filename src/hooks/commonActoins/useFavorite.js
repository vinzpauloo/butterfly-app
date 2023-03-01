import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const Favorite = () => {
  const postSaveFavorite = (data) => {
    return request({
      headers: getHeaders(),
      url: "/customers/save-favorite",
      method: "POST",
      data: data,
    });
  };

  const postFavoriteChecker = (data) => {
    return request({
      headers: getHeaders(),
      url: "/customers/favorite-checker",
      method: "POST",
      data: data,
    });
  };

  const deleteRemoveFavorite = (data) => {
    const { foreign_id, customer_id } = data;
    return request({
      headers: getHeaders(),
      url: `/customers/remove-favorite/${foreign_id}/${customer_id}`,
      method: "DELETE",
    });
  };

  return { postSaveFavorite, postFavoriteChecker, deleteRemoveFavorite };
};
