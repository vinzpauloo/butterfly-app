import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const Feeds = () => {
  const getFeeds = (data) => {
    return request({
      headers: getHeaders(),
      url: `/feeds`,
      method: "GET",
      params: data,
    });
  };

  const getSpecificFeed = (id) => {
    return request({
      headers: getHeaders(),
      url: `/feeds/${id}`,
      method: "GET",
    });
  };
  return { getFeeds, getSpecificFeed };
};
