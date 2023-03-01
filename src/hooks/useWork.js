import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const Work = () => {
  const getWorkAll = (data) => {
    return request({
      headers: getHeaders(),
      url: "/works",
      method: "GET",
      params: data,
    });
  };

  const getWorkRecommended = (data) => {
    return request({
      headers: getHeaders(),
      url: "/works",
      method: "GET",
      params: data,
    });
  };

  const getWorkComments = (data) => {
    return request({
      headers: getHeaders(),
      url: `/comments/pagination`,
      method: "GET",
      params: data,
    });
  };

  return { getWorkAll, getWorkRecommended, getWorkComments };
};
