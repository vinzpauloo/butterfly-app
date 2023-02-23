import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const FollowingFansList = () => {
  const getFollowersList = (id) => {
    return request({
      headers: getHeaders(),
      url: `/follow-action/list/${id}`,
      method: "GET",
    });
  };

  const getFollowerCount = (id) => {
    return request({
      headers: getHeaders(),
      url: `/follow-action/count/${id}`,
      method: "GET",
    });
  };

  return { getFollowersList, getFollowerCount };
};
