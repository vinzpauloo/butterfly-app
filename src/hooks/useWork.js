import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const Work = () => {
  const getWorkAll = (data) => {
    return request({
      headers: getHeaders(),
      url: "/work",
      method: "GET",
      params: data,
    });
  };

  const getWorkRecommended = (data) => {
    return request({
      headers: getHeaders(),
      url: "/work",
      method: "GET",
      params: data,
    });
  };

  const getWorkComments = (data) => {
    return request({
      headers: getHeaders(),
      url: `/comment/pagination`,
      method: "GET",
      params: data,
    });
  };

  return { getWorkAll, getWorkRecommended, getWorkComments };
};
