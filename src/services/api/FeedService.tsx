import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IFeeds {
  data?: {
    user_id?: number;
    feedId?: string;
    tag?: string;
    with?: string;
    page?: number;
    featured?: boolean;
    recommended?: boolean;
    latest?: boolean;
    video_only?: boolean;
    images_only?: boolean;
    services_only?: boolean;
    approval?: string;
    sort_by?: string;
    sort?: string;
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

  const getFeaturedFeeds = (token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/feature/feeds",
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
