import request from "lib/request";

export const FollowingFansList = () => {
  const getFollowersList = (id) => {
    return request({
      url: `/follow-action/list/${id}`,
      method: "GET",
    });
  };

  const getFollowerCount = (id) => {
    return request({
      url: `/follow-action/count/${id}`,
      method: "GET",
    });
  };

  return { getFollowersList, getFollowerCount };
};
