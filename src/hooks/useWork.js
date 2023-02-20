import request from "lib/request";

export const Work = () => {
  const getWorkAll = (data) => {
    return request({
      url: "/work",
      method: "GET",
      params: data,
    });
  };

  const getWorkRecommended = (data) => {
    return request({
      url: "/work",
      method: "GET",
      params: data,
    });
  };

  const getWorkComments = (data) => {
    return request({
      url: `/comment/pagination`,
      method: "GET",
      params: data,
    });
  };

  return { getWorkAll, getWorkRecommended, getWorkComments };
};
