import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IFeed {
  site_id?: number;
  user_id?: number;
  tag?: string;
  with?: string;
  page?: number;
  ads?: boolean;
  latest?: boolean;
  video_only?: boolean;
  images_only?: boolean;
  services_only?: boolean;
  featured?: boolean;
  recommended?: boolean;
}

interface IFeeds {
  data: {
    feedId?: string;
    tag?: string;
    with?: string;
    page?: number;
  };
  token: string;
}

const FeedService = () => {
  const getFeeds = (params: IFeeds) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/feeds",
      method: "GET",
      params: params.data,
    });
  };

  const getFeaturedFeeds = (params: IFeed) => {
    return request({
      headers: getHeaders(),
      url: "/feeds/featured",
      method: "GET",
    });
  };

  const getSpecificFeed = (params: IFeeds) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/feeds/${params.data.feedId}`,
      method: "GET",
    });
  };

  return { getFeeds, getFeaturedFeeds, getSpecificFeed };
};

export default FeedService;
