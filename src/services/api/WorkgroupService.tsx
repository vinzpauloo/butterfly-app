import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IWorkgroupParams {
  navbar: string;
  page: number;
  paginate: number;
}
interface IWorkgroupRecentlyUpdatedParams {
  id: string;
  recently_updated: boolean;
  with: string;
  paginate: number;
  page: number;
}
interface IWorkgroupMostViewedParams {
  id: string;
  most_viewed: boolean;
  with: string;
  paginate: number;
  page: number;
}
interface IWorkgroupMostLikedParams {
  id: string;
  most_liked: boolean;
  with: string;
  paginate: number;
  page: number;
}

const WorkgroupService = () => {
  const getWorkgroup = (params: IWorkgroupParams) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params,
    });
  };

  const getRecentlyUpdated = (params: IWorkgroupRecentlyUpdatedParams) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params,
    });
  };

  const getMostViewed = (params: IWorkgroupMostViewedParams) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params,
    });
  };

  const getMostLiked = (params: IWorkgroupMostLikedParams) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params,
    });
  };

  return { getWorkgroup, getRecentlyUpdated, getMostViewed, getMostLiked };
};

export default WorkgroupService;
