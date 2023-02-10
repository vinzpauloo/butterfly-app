import request from "utils/request";

export const SingleVideo = () => {
  const getLikesCount = (id) => {
    return request({
      url: `/like-action/count/${id}`,
      method: "GET",
    });
  };

  const getWorkAll = (id) => {
    return request({
      url: `/work/all/${id}`,
      method: "GET",
    });
  };

  const getWorkRecommended = () => {
    return request({
      url: `/work/recommended`,
      method: "GET",
    });
  };

  return { getLikesCount, getWorkAll, getWorkRecommended };
};
