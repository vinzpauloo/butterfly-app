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

  const getWorkComments = (id) => {
    return request({
      url: `/comment/${id}`,
      method: "GET",
    });
  };

  return { getWorkAll, getWorkRecommended, getWorkComments };
};
