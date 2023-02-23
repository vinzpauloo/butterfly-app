import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const Follow = () => {
  const postFollowChecker = (data) => {
    return request({
      headers: getHeaders(),
      url: "/customer/follow-checker",
      method: "POST",
      data: data,
    });
  };

  const postFollowCreator = (data) => {
    return request({
      headers: getHeaders(),
      url: "/customer/follow-creator",
      method: "POST",
      data: data,
    });
  };

  const deleteUnfollowCreator = (data) => {
    const { user_id, customer_id } = data;
    return request({
      headers: getHeaders(),
      url: `/customer/unfollow-creator/${user_id}/${customer_id}`,
      method: "DELETE",
    });
  };

  return { postFollowChecker, postFollowCreator, deleteUnfollowCreator };
};
