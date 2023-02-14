import request from "lib/request";

export const SingleVideo = () => {
  const getLikesCount = (id) => {
    return request({
      url: `/like-action/count/${id}`,
      method: "GET",
    });
  };

  const getWorkAll = (data) => {
    return request({
      url: "/work",
      method: "GET",
      params: data,
    });
  };

  const getWorkRecommended = () => {
    return request({
      url: "/work/recommended",
      method: "GET",
    });
  };

  const getWorkComments = (id) => {
    return request({
      url: `/work/comments/${id}`,
      method: "GET",
    });
  };

  return { getLikesCount, getWorkAll, getWorkRecommended, getWorkComments };
};
